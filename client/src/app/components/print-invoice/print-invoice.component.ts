import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../system.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../classes.service';
import { UtilityService } from '../../utility.service';

@Component({
    selector: 'app-print-invoice',
    imports: [CommonModule],
    templateUrl: './print-invoice.component.html',
    styleUrl: './print-invoice.component.css'
})
export class PrintInvoiceComponent implements OnInit {

    invoiceData: any = {};
    invoiceId: String = '';

    constructor(public routerId: ActivatedRoute, public system: SystemService, public utility: UtilityService) {
        this.invoiceData = new Invoice("", "", "фактура", "", "", "15", "", "", [{ name: "", quantity: 0, price: 0.00, unit: 'бр.', discount: 0 }])
    }

    ngOnInit() {
        this.routerId.paramMap.subscribe(params => {
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
        });
    }
}
