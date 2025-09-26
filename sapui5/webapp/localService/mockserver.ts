import MockServer from 'sap/ui/core/util/MockServer';
import JSONModel from 'sap/ui/model/json/JSONModel';
import Log from 'sap/base/Log';

// Dependencia de URI.js (global en SAPUI5, pero se puede declarar)
declare const URI: any;

let oMockServer: MockServer | undefined;

const _sAppPath = 'logaligroup/sapui5/';
const _sJsonFilesPath = _sAppPath + 'localService/mockdata';

// Definimos las opciones que puede recibir init
interface MockServerOptions {
  delay?: number;
  metadataError?: boolean;
  errorType?: 'badRequest' | 'serverError';
}

const oMockServerInterface = {

  init: (oOptionsParameter?: MockServerOptions): Promise<void> => {
    const oOptions = oOptionsParameter || {};

    return new Promise((fnResolve, fnReject) => {
      const sManifestUrl = sap.ui.require.toUrl(_sAppPath + 'manifest.json');
      const oManifestModel = new JSONModel(sManifestUrl);

      oManifestModel.attachRequestCompleted(() => {
        const oUriParameters = new URLSearchParams(window.location.href);

        // Parse manifest para metadata URI
        const sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
        const oMainDataSource = oManifestModel.getProperty('/sap.app/dataSources/mainService');

        const sMetadataUrl = sap.ui.require.toUrl(
          _sAppPath + oMainDataSource.settings.localUri
        );

        // Asegura que la URI está resuelta correctamente
        const sMockServerUrl =
          oMainDataSource.uri &&
          new URI(oMainDataSource.uri)
            .absoluteTo(sap.ui.require.toUrl(_sAppPath))
            .toString();

        // Crear o reiniciar el mock server
        if (!oMockServer) {
          oMockServer = new MockServer({ rootUri: sMockServerUrl });
        } else {
          oMockServer.stop();
        }

        // Configuración
        MockServer.config({
          autoRespond: true,
          autoRespondAfter:
            oOptions.delay || Number(oUriParameters.get('serverDelay')) || 500,
        });

        // Simulación de requests
        oMockServer.simulate(sMetadataUrl, {
          sMockdataBaseUrl: sJsonFilesUrl,
          bGenerateMissingMockData: true,
        });

        let aRequests = oMockServer.getRequests();

        // Helper para simular errores
        const fnResponse = (
          iErrCode: number,
          sMessage: string,
          aRequest: any
        ) => {
          aRequest.response = (oXhr: any) => {
            oXhr.respond(iErrCode, {
              'Content-Type': 'text/plain;charset=utf-8',
              sMessage,
            });
          };
        };

        // Errores de metadata
        if (oOptions.metadataError || oUriParameters.get('metadataError')) {
          aRequests.forEach((aEntry: any) => {
            if (aEntry.path.toString().indexOf('$metadata') > -1) {
              fnResponse(500, 'metadata Error', aEntry);
            }
          });
        }

        // Errores en requests
        const sErrorParam =
          oOptions.errorType || oUriParameters.get("errorType");
        const iErrorCode = sErrorParam === 'badRequest' ? 400 : 500;

        if (sErrorParam) {
          aRequests.forEach((aEntry: any) => {
            fnResponse(iErrorCode, sErrorParam, aEntry);
          });
        }

        // Arrancar el server
        oMockServer.setRequests(aRequests);
        oMockServer.start();

        Log.info('Running the app with mock data');
        fnResolve();
      });

      oManifestModel.attachRequestFailed(() => {
        const sError = 'Failed to load the application manifest';
        Log.error(sError);
        fnReject(new Error(sError));
      });
    });
  },
};

export default oMockServerInterface;
