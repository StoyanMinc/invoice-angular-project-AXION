import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SystemService } from '../../system.service';

@Component({
    selector: 'app-automatic-invoices',
    imports: [RouterLink, CommonModule],
    templateUrl: './automatic-invoices.component.html',
    styleUrl: './automatic-invoices.component.css'
})
export class AutomaticInvoicesComponent {

    invoices: any[] = [];
    constructor(router: Router, public system: SystemService) {
        system.GetAutomaticInvoices().subscribe(
            (response) => { this.invoices = response; },
            (error) => { console.log(error); }
        )
    }

    deleteInvoice(invoiceId) {
        this.system.DeleteAutomaticInvoice(invoiceId).subscribe(
            (response) => {
                this.invoices = this.invoices.filter(invoice => invoice._id !== invoiceId);
            },
            (error) => { console.log(error); }
        )
    }
}
