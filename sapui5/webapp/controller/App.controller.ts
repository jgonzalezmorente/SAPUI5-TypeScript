import Controller from 'sap/ui/core/mvc/Controller';
import AppComponent from '../Component';

/**
 * @namespace logaligroup.sapui5.controller
 */
export default class App extends Controller {

    public onInit(): void {
    }

    public onOpenDialogHeader(): void {
        const oComponent = this.getOwnerComponent() as AppComponent;
        oComponent.openHelloDialog();
    }
}