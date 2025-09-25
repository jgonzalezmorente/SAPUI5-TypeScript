import BaseComponent from 'sap/ui/core/UIComponent';
import { createRecipient } from './model/Models';
import HelloDialog from './controller/HelloDialog';
import View from 'sap/ui/core/mvc/View';

/**
 * @namespace logaligroup.sapui5
 */
export default class Component extends BaseComponent {

	private _helloDialog: HelloDialog;

	public static metadata = {
		manifest: 'json',
        interfaces: [
            'sap.ui.core.IAsyncContentCreation'
        ]
	};

	public init() : void {
		super.init();
        this.setModel(createRecipient());
	}

	public openHelloDialog() {
		if (!this._helloDialog) {
			const oView = this.getRootControl() as View;
			this._helloDialog = new HelloDialog(oView);
		}
		this._helloDialog.open();
	}
}