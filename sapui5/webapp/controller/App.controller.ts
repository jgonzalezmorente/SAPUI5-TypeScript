import Controller from 'sap/ui/core/mvc/Controller';
import MessageToast from 'sap/m/MessageToast';
import ResourceModel from 'sap/ui/model/resource/ResourceModel';
import ResourceBundle from 'sap/base/i18n/ResourceBundle';

/**
 * @namespace logaligroup.sapui5.controller
 */
export default class App extends Controller {
    
    public onInit(): void {
    }

    public onShowHello() {
        const oBundle = (this.getView()?.getModel('i18n') as ResourceModel).getResourceBundle() as ResourceBundle;
        const sRecipient = this.getView()?.getModel()?.getProperty('/recipient/name');
        const sMsg = oBundle.getText('helloMsg', [sRecipient]) ?? '';
        MessageToast.show(sMsg);
    }
}