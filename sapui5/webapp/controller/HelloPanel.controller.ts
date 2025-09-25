import Controller from 'sap/ui/core/mvc/Controller';
import MessageToast from 'sap/m/MessageToast';
import ResourceModel from 'sap/ui/model/resource/ResourceModel';
import ResourceBundle from 'sap/base/i18n/ResourceBundle';
import AppComponent from '../Component';

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
        const oComponent = this.getOwnerComponent() as AppComponent;
        oComponent.openHelloDialog();
    }
}