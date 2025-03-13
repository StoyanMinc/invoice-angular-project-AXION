import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component.js';
import { DocumentsComponent } from './components/documents/documents.component.js';
import { ClientsComponent } from './components/clients/clients.component.js';
import { SalesComponent } from './components/sales/sales.component.js';
import { AddSalesComponent } from './components/add-sales/add-sales.component.js';
import { ExpensesComponent } from './components/expenses/expenses.component.js';
import { AddIncomingInvoiceComponent } from './components/add-incoming-invoice/add-incoming-invoice.component.js';
import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component.js';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    // { path: 'documents/sales', component: DocumentsComponent },
    { path: 'clients', component: ClientsComponent },
    {path: 'documents/sales', component: SalesComponent},
    {path: 'documents/sales/add-invoice', component: AddSalesComponent},
    {path: 'documents/expenses', component: ExpensesComponent},
    {path: 'documents/expenses/add-invoice', component: AddIncomingInvoiceComponent},
    {path: 'documents/sales/:invoiceId/edit', component: EditInvoiceComponent},
    
    
];
