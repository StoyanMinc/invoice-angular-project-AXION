import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  http: any;


  lastInvoicesUrl = 'http://localhost:5001/invoices';
  lastInvoiceUrl = 'http://localhost:5001/invoices/get-last-invoice';
  lastProformaUrl = 'http://localhost:5001/invoices/get-last-proforma';
  invoicesUrl = 'http://localhost:5001/invoices/sales';
  createInvoiceUrl = 'http://localhost:5001/invoices/create-invoice';
  editInvoiceUrl = 'http://localhost:5001/invoices/:invoiceId/edit';

  lastIncomingInvoiceUrl = 'http://localhost:5001/incoming-invoices';
  incomingInvoicesUrl = 'http://localhost:5001/incoming-invoices/expenses';

  GetClientsUrl = 'http://localhost:5001/clients';
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
  EditInvoice(invoiceData: any) { return this.http.put(this.editInvoiceUrl, invoiceData) };
  DeleteInvoice(invoiceId) { return this.http.get(`${this.lastInvoicesUrl}/sales/${invoiceId}/delete`) };


  // INCOMING INVOICE REQUESTS
  GetLastTenIncomingInvoices() { return this.http.get(this.lastIncomingInvoiceUrl); };
  GetIncomingInvoices() { return this.http.get(this.incomingInvoicesUrl) };
  GetClients() { return this.http.get(this.GetClientsUrl) }
}
