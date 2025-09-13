import Controller from 'sap/ui/core/mvc/Controller';
import MessageToast from 'sap/m/MessageToast';
import ResourceModel from 'sap/ui/model/resource/ResourceModel';
import ResourceBundle from 'sap/base/i18n/ResourceBundle';
import Fragment from 'sap/ui/core/Fragment';
import UI5Element from 'sap/ui/core/Element';
import Dialog from 'sap/m/Dialog';

/**
 * @namespace logaligroup.sapui5.controller
 */
export default class HelloPanel extends Controller {

    public onInit(): void {
    }

    public onShowHello() {
        const oBundle = (this.getView()?.getModel('i18n') as ResourceModel).getResourceBundle() as ResourceBundle;
        const sRecipient = this.getView()?.getModel()?.getProperty('/recipient/name');
        const sMsg = oBundle.getText('helloMsg', [sRecipient]) ?? '';
        MessageToast.show(sMsg);
    }

    public async onOpenDialog() {
        const oView = this.getView();
        if (!oView) return;
        let oDialog = oView.byId('_IDGenDialog') as Dialog | undefined;
        if (!oDialog) {
            console.log('dialog')
            oDialog = await Fragment.load({
                id: oView?.getId(),
                name: 'logaligroup.sapui5.view.HelloDialog',
                controller: this
            }) as Dialog;
            oView?.addDependent(oDialog);
        }
        oDialog.open();
    }

    public onCloseDialog() {
        const oView = this.getView();
        if (!oView) return;
        const oDialog = oView.byId('_IDGenDialog') as Dialog | undefined;
        if (oDialog) oDialog.close();
    }
}