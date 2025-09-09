import JSONModel from "sap/ui/model/json/JSONModel";

export function createRecipient() {
    const oData = {
        recipient: {
            name: 'World'
        }
    };
    return new JSONModel(oData);
}