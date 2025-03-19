import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../system.service';
import { UtilityService } from '../../utility.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit-automatic-invoice',
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-automatic-invoice.component.html',
    styleUrl: './edit-automatic-invoice.component.css'
})
export class EditAutomaticInvoiceComponent implements OnInit {

    invoiceId: string = '';
    automaticInvoiceData: any = {};
    clients: any[] = [];
    constructor(public router: Router, public routerId: ActivatedRoute, public system: SystemService, public utility: UtilityService) {
        system.GetClients().subscribe(
            (response) => { this.clients = response },
            (error) => { console.log(error); }
        )
    }

    ngOnInit(): void {
        this.routerId.paramMap.subscribe(params => {
            this.invoiceId = params.get('invoiceId') ?? 'undefined';
            if (this.invoiceId) {
                this.system.GetOneAutomaticInvoice(this.invoiceId).subscribe(
                    (response) => { this.automaticInvoiceData = response; console.log(this.automaticInvoiceData); },
                    (error) => { console.log(error); }
                )
            }
        })
    };

    editAutomaticInvoice() {
        this.automaticInvoiceData.products = this.automaticInvoiceData.products.filter(p => p.name !== '' && p.qty > 0);
        this.automaticInvoiceData.totalPrice = this.utility.ReturnTotalWithVAT(this.automaticInvoiceData);
        this.system.EditAutomaticInvoice(this.invoiceId, this.automaticInvoiceData).subscribe(
            (response) => {
                console.log(response);
                this.router.navigate(['/documents/automatic-invoices'])
            },
            (error) => { console.log(error); }
        )
    }

    selectMol() {
        this.automaticInvoiceData.mol = this.clients.find(client => client._id === this.automaticInvoiceData.client).mol;
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
