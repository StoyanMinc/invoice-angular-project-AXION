import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../../system.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutomaticInvoice } from '../../classes.service';
import { UtilityService } from '../../utility.service';

@Component({
    selector: 'app-add-automatic-invoice',
    imports: [FormsModule, CommonModule],
    templateUrl: './add-automatic-invoice.component.html',
    styleUrl: './add-automatic-invoice.component.css'
})
export class AddAutomaticInvoiceComponent {

    automaticInvoiceData: any = {};
    clients: any[] = [];

    constructor(public router: Router, public system: SystemService, public utility: UtilityService) {
        this.automaticInvoiceData = new AutomaticInvoice(this.clients[0]?.nameOfClient, '', '1', '15', 'В брой', '', [{ name: "", measure: 'count', qty: 0, unitPrice: 0.00, to: 0 }])
        system.GetClients().subscribe(
            (response) => {
                this.clients = response;
                this.automaticInvoiceData.client = this.clients[0]._id;
                this.automaticInvoiceData.mol = this.clients[0].mol;

            },
            (error) => { console.log(error); }
        );
    };

    createAutomaticInvoice() {
        this.automaticInvoiceData.products = this.automaticInvoiceData.products.filter(p => p.name !== '' && p.qty > 0);
        this.automaticInvoiceData.totalPrice = this.utility.ReturnTotalWithVAT(this.automaticInvoiceData);
        this.system.CreateAutomaticInvoice(this.automaticInvoiceData).subscribe(
            (response) => { this.router.navigate(['/documents/automatic-invoices']) },
            (error) => { console.log(error); }
        );
    };

    SelectedClient() {
        let client_id = this.automaticInvoiceData.client;
        this.automaticInvoiceData.mol = this.clients.filter(client => client._id == client_id)[0].mol;
    };

    CheckForNewRow(product, idx) {
        if (idx == this.automaticInvoiceData.products.length - 1) {
            if (product.name.length > 0 || product.unitPrice > 0 || product.qty > 0) {
                this.automaticInvoiceData.products.push({ name: "", qty: 0, unitPrice: 0.00, unit: 'бр.', discount: 0 });
            }
        }
    };
    RemoveRow(idx) { this.automaticInvoiceData.products.splice(idx, 1); };

}
