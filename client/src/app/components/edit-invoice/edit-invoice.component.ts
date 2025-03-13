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
                        console.log(this.invoiceData);
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
}
