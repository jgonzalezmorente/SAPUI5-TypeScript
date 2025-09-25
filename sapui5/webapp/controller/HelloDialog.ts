import Dialog from 'sap/m/Dialog';
import ManagedObject from 'sap/ui/base/ManagedObject';
import Fragment from 'sap/ui/core/Fragment';
import View from 'sap/ui/core/mvc/View';

const DIALOG_ID: string = 'helloDialog';

export default class HelloDialog extends ManagedObject {

    constructor(private _oView?: View) {
        super();
    }

    public exit(): void {
        if (this._oView) {
            const oDialog = this._oView.byId(DIALOG_ID) as Dialog | undefined;
            oDialog?.destroy();
        }
        delete this._oView;
    }

    public async open(): Promise<void> {
        if (!this._oView) return;
        let oDialog = this._oView.byId(DIALOG_ID) as Dialog | undefined;
        if (!oDialog) {
            oDialog = await Fragment.load({
                id: this._oView?.getId(),
                name: 'logaligroup.sapui5.view.HelloDialog',
                controller: this
            }) as Dialog;
            this._oView?.addDependent(oDialog);
        }
        oDialog.open();
    }

    public onCloseDialog() {
        if (!this._oView) return;
        const oDialog = this._oView.byId(DIALOG_ID) as Dialog | undefined;
        if (oDialog) oDialog.close();
    }
}