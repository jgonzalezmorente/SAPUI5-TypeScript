import BaseComponent from 'sap/ui/core/UIComponent';
import { createRecipient } from './model/models';

/**
 * @namespace logaligroup.sapui5
 */
export default class Component extends BaseComponent {

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
}