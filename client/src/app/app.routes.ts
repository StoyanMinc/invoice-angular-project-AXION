import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component.js';
import { ClientsComponent } from './components/clients/clients.component.js';
import { SalesComponent } from './components/sales/sales.component.js';
import { AddSalesComponent } from './components/add-sales/add-sales.component.js';
import { ExpensesComponent } from './components/expenses/expenses.component.js';
import { AddIncomingInvoiceComponent } from './components/add-incoming-invoice/add-incoming-invoice.component.js';
import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component.js';
import { EditIncomingInvoiceComponent } from './components/edit-incoming-invoice/edit-incoming-invoice.component.js';
import { PrintInvoiceComponent } from './components/print-invoice/print-invoice.component.js';
import { AutomaticInvoicesComponent } from './components/automatic-invoices/automatic-invoices.component.js';
import { AddAutomaticInvoiceComponent } from './components/add-automatic-invoice/add-automatic-invoice.component.js';
import { EditAutomaticInvoiceComponent } from './components/edit-automatic-invoice/edit-automatic-invoice.component.js';
import { OffersComponent } from './components/offers/offers.component.js';
import { AddOfferComponent } from './components/add-offer/add-offer.component.js';
import { EditOfferComponent } from './components/edit-offer/edit-offer.component.js';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'clients', component: ClientsComponent },
    { path: 'documents/sales', component: SalesComponent },
    { path: 'documents/sales/add-invoice', component: AddSalesComponent },
    { path: 'documents/sales/:invoiceId/edit', component: EditInvoiceComponent },
    { path: 'documents/expenses', component: ExpensesComponent },
    { path: 'documents/expenses/add-invoice', component: AddIncomingInvoiceComponent },
    { path: 'documents/expenses/:invoiceId/edit', component: EditIncomingInvoiceComponent },
    { path: 'documents/sales/:invoiceId/print-invoice', component: PrintInvoiceComponent },
    { path: 'documents/automatic-invoices', component: AutomaticInvoicesComponent },
    { path: 'documents/automatic-invoices/add-invoice', component: AddAutomaticInvoiceComponent },
    { path: 'documents/automatic-invoices/:invoiceId/edit', component: EditAutomaticInvoiceComponent },
    { path: 'documents/offers', component: OffersComponent },
    { path: 'documents/offers/add-offer', component: AddOfferComponent },
    { path: 'documents/offers/:offerId/edit', component: EditOfferComponent }
];
