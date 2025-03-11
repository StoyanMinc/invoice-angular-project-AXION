import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  http:any;


  lastInvoicesUrl = 'http://localhost:5001/invoices';
  invoicesUrl = 'http://localhost:5001/invoices/sales';
  createInvoiceUrl = 'http://localhost:5001/invoices/create-invoice';

  lastIncomingInvoiceUrl = 'http://localhost:5001/incoming-invoices';
  incomingInvoicesUrl = 'http://localhost:5001/incoming-invoices/expenses';
  
  GetClientsUrl = 'http://localhost:5001/clients';
  constructor() {
  }

  LoadHttpModule(module:HttpClient) { this.http = module; };

  GetLastInvoices() { return this.http.get(this.lastInvoicesUrl); };
  GetInvoices() { return this.http.get(this.invoicesUrl); };
  CreateInvoice(invoiceData: any) {return this.http.post(this.createInvoiceUrl, invoiceData)}

  GetLastIncomingInvoices() { return this.http.get(this.lastIncomingInvoiceUrl); };
  GetIncomingInvoices() {return this.http.get(this.incomingInvoicesUrl)};
  GetClients() {return this.http.get(this.GetClientsUrl)}
}
