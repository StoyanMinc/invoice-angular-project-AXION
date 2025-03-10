import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  http: any;

  lastInvoicesUrl = 'http://localhost:5001/invoices';
  invoicesUrl = 'http://localhost:5001/invoices/sales';

  lastIncomingInvoiceUrl = 'http://localhost:5001/incoming-invoices';

  constructor() { }

  LoadHttpModule(module) { this.http = module; };

  GetLastInvoices() { return this.http.get(this.lastInvoicesUrl); };
  GetInvoices() { return this.http.get(this.invoicesUrl); };

  GetLastIncomingInvoices() { return this.http.get(this.lastIncomingInvoiceUrl); };
}
