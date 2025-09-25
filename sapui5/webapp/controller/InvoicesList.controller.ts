import Controller from 'sap/ui/core/mvc/Controller';
import JSONModel from 'sap/ui/model/json/JSONModel';
import InvoicesFormatter from '../model/InvoicesFormatter';
import type Event from 'sap/ui/base/Event';
import Filter from 'sap/ui/model/Filter';
import FilterOperator from 'sap/ui/model/FilterOperator';
import type ListBinding from 'sap/ui/model/ListBinding';

/**
 * @namespace logaligroup.sapui5.controller
 */
export default class InvoicesList extends Controller {

    public formatter = InvoicesFormatter;

    public onInit(): void {
        const oViewModel = new JSONModel({
            usd: 'USD',
            eur: 'EUR'
        });
        this.getView()?.setModel(oViewModel, 'currency');    
    }

    public onFilterInvoices(oEvent: any) {
        const aFilter = [];
        const sQuery = oEvent.getParameter('query');
        if (sQuery) {
            aFilter.push(new Filter('ProductName', FilterOperator.Contains, sQuery));
        }
        const oList = this.getView()?.byId('invoiceList');
        const oBinding = oList?.getBinding('items') as ListBinding;
        oBinding.filter(aFilter);
    }
}