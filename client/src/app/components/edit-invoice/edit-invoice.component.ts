import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SystemService } from '../../system.service';
import { Invoice } from '../../classes.service';
import { UtilityService } from '../../utility.service';

@Component({
    selector: 'app-edit-invoice',
    imports: [FormsModule, CommonModule],
    templateUrl: './edit-invoice.component.html',
    styleUrl: './edit-invoice.component.css'
})
export class EditInvoiceComponent implements OnInit {

    invoiceId: String = '';
    invoiceData: any;
    clients: any[] = [];

    constructor(public router: Router, public routeId: ActivatedRoute, private system: SystemService, public utility: UtilityService) {
        this.invoiceData = new Invoice("", "", "фактура", "", "", "15", "", "", [{ name: "", quantity: 0, price: 0.00, unit: 'бр.', discount: 0 }])
        this.system.GetClients().subscribe(
            (response) => { this.clients = response; },
            (error) => { console.log(error.message); }
        );
    }

    ngOnInit() {
        this.routeId.paramMap.subscribe(params => {
            this.invoiceId = params.get('invoiceId') ?? 'undefined';
            if (this.invoiceId) {
                this.system.GetOneInvoice(this.invoiceId).subscribe(
                    (response) => {
                        this.invoiceData = response;
                    },
                    (error) => { console.log(error); }
                );
            }
        })
    }

    selectMol() {
        const mol = this.clients.find(client => client._id === this.invoiceData.client._id).mol;
        this.invoiceData.mol = mol;
    }

    editInvoice() {
        this.system.EditInvoice(this.invoiceId, this.invoiceData).subscribe(
            (response) => {
                console.log('Edit invoice successufuly!');
                this.router.navigate(['/documents/sales']);
            },
            (error) => { console.log(error); }
        );
    }

    CheckForNewRow(product, idx) {
        if (idx == this.invoiceData.products.length - 1) {
            if (product.name.length > 0 || product.unitPrice > 0 || product.qty > 0) {
                this.invoiceData.products.push({ name: "", qty: 0, unitPrice: 0.00, unit: 'бр.', discount: 0 });
            }
        }
    }
    RemoveRow(idx) { this.invoiceData.products.splice(idx, 1); }
}
