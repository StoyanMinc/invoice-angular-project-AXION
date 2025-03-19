import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SystemService {
    http: any;

    // INVOICE URL'S
    lastInvoicesUrl = 'http://localhost:5001/invoices';
    lastInvoiceUrl = 'http://localhost:5001/invoices/get-last-invoice';
    lastProformaUrl = 'http://localhost:5001/invoices/get-last-proforma';
    invoicesUrl = 'http://localhost:5001/invoices/sales';
    createInvoiceUrl = 'http://localhost:5001/invoices/create-invoice';

    // INCOMING INVOICE URL'S
    lastIncomingInvoiceUrl = 'http://localhost:5001/incoming-invoices';
    incomingInvoicesUrl = 'http://localhost:5001/incoming-invoices/expenses';
    createIncomingInvoiceUrl = 'http://localhost:5001/incoming-invoices/create-invoice';

    // CLIENTS URL'S
    getClientsUrl = 'http://localhost:5001/clients';

    // AUTOMATIC INVOICES URL'S
    getAutomaticInvoicesUrl = 'http://localhost:5001/automatic-invoices';

    //OFFERS URL'S
    offersBaseUrl = 'http://localhost:5001/offers';
    constructor() {
    }

    LoadHttpModule(module: HttpClient) { this.http = module; };

    // INVOICE REQUESTS
    GetLastTenInvoices() { return this.http.get(this.lastInvoicesUrl); };
    GetLastInvoice() { return this.http.get(this.lastInvoiceUrl); };
    GetLastProforma() { return this.http.get(this.lastProformaUrl) };
    GetInvoices() { return this.http.get(this.invoicesUrl); };
    GetOneInvoice(invoiceId) { return this.http.get(`${this.lastInvoicesUrl}/sales/${invoiceId}`) };
    CreateInvoice(invoiceData: any) { return this.http.post(this.createInvoiceUrl, invoiceData) };
    EditInvoice(invoiceId, invoiceData: any) { return this.http.put(`${this.lastInvoicesUrl}/${invoiceId}/edit`, invoiceData) };
    DeleteInvoice(invoiceId) { return this.http.get(`${this.lastInvoicesUrl}/sales/${invoiceId}/delete`) };


    // INCOMING INVOICE REQUESTS
    GetLastTenIncomingInvoices() { return this.http.get(this.lastIncomingInvoiceUrl); };
    GetIncomingInvoices() { return this.http.get(this.incomingInvoicesUrl) };
    GetOneIncomingInvoice(invoiceId) { return this.http.get(`${this.incomingInvoicesUrl}/${invoiceId}`) }
    CreateIncomingInvoice(invoiceData) { return this.http.post(this.createIncomingInvoiceUrl, invoiceData) };
    EditIncomingInvoice(invoiceId, invoiceData: any) { return this.http.put(`${this.lastIncomingInvoiceUrl}/${invoiceId}/edit`, invoiceData) };
    DeleteIncomingInvoice(invoiceId) { return this.http.delete(`${this.incomingInvoicesUrl}/${invoiceId}/delete`) };

    // CLIENTS REQUESTS
    GetClients() { return this.http.get(this.getClientsUrl) }
    GetOneClient(clientId) { return this.http.get(`${this.getClientsUrl}/${clientId}`) }
    CreateClient(clientData) { return this.http.post(this.getClientsUrl, clientData) };
    EditClient(clientId: string, cliendData: {}) { return this.http.put(`${this.getClientsUrl}/${clientId}`, cliendData) }
    DeleteClient(clientId) { return this.http.delete(`${this.getClientsUrl}/${clientId}`) };

    // AUTOMATIC INVOICES REQUESTS
    GetAutomaticInvoices() { return this.http.get(this.getAutomaticInvoicesUrl) };
    GetOneAutomaticInvoice(invoiceId: string) { return this.http.get(`${this.getAutomaticInvoicesUrl}/${invoiceId}`) };
    CreateAutomaticInvoice(invoiceData) { return this.http.post(this.getAutomaticInvoicesUrl, invoiceData) };
    EditAutomaticInvoice(invoiceId: string, invoiceData: {}) { return this.http.put(`${this.getAutomaticInvoicesUrl}/${invoiceId}/edit`, invoiceData) };
    DeleteAutomaticInvoice(invoiceId) { return this.http.get(`${this.getAutomaticInvoicesUrl}/${invoiceId}/delete`) };

    // OFFERS REQUESTS
    GetOffers() { return this.http.get(this.offersBaseUrl) };
    GetOneOffer(offerId) { return this.http.get(`${this.offersBaseUrl}/${offerId}`) };
    CreateOffer(offerData) { return this.http.post(this.offersBaseUrl, offerData) };
    EditOffer(offerId, offerData) { return this.http.put(`${this.offersBaseUrl}/${offerId}`, offerData) };
    DeleteOffer(offerId) { return this.http.delete(`${this.offersBaseUrl}/${offerId}/delete`) };
}