import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../utility.service';
import { SystemService } from '../../system.service';
import { IncomingInvoice } from '../../classes.service';

@Component({
    selector: 'app-edit-incoming-invoice',
    imports: [FormsModule],
    templateUrl: './edit-incoming-invoice.component.html',
    styleUrl: './edit-incoming-invoice.component.css'
})
export class EditIncomingInvoiceComponent implements OnInit {

    invoiceData: any;
    invoiceId: any = String;

    constructor(public router: Router, public routerId: ActivatedRoute, public system: SystemService, public utility: UtilityService,) {
        this.invoiceData = new IncomingInvoice('', '', '', '', '', '', '', '');
    }

    ngOnInit() {
        this.routerId.paramMap.subscribe(param => {
            this.invoiceId = param.get('invoiceId');
            this.system.GetOneIncomingInvoice(this.invoiceId).subscribe(
                (response) => {
                    this.invoiceData = response;
                },
                (error) => {
                    console.log(error);
                }
            )
        });

    }
    editInvoice() {
        const editedInvoice = this.invoiceData;
        editedInvoice.invoiceDate = this.utility.FormatDate(editedInvoice.invoiceDate);
        editedInvoice.expireDate = this.utility.CalculateExpireDate(editedInvoice.invoiceDate, editedInvoice.paymentTerm);
        this.system.EditIncomingInvoice(this.invoiceId, editedInvoice).subscribe(
            (response) => {
                this.router.navigate(['/documents/expenses']);
            },
            (error) => { console.log(error); }
        );
    }
}
