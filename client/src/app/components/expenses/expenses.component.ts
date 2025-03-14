import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SystemService } from '../../system.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-expenses',
    imports: [RouterLink, CommonModule],
    templateUrl: './expenses.component.html',
    styleUrl: './expenses.component.css'
})
export class ExpensesComponent {

    invoices: any[] = [];
    constructor(private system: SystemService, public router: Router) {
        this.system.GetIncomingInvoices().subscribe(
            (result) => { this.invoices = result },
            (error) => { console.log(error.message); }
        )
    }

    CalculateTotalInvoicePrice() {
        const totalPrice = this.invoices.map(i => i.sumForPay).reduce((a, c) => a + c, 0) || 0;
        return totalPrice;
    }

    deleteInvoice(invoiceId) {
        this.system.DeleteIncomingInvoice(invoiceId).subscribe(
            (response) => {
                console.log(response);
                this.invoices = this.invoices.filter(invoice => invoice._id !== invoiceId);
                this.router.navigate(['/documents/expenses']);
            },
            (error) => { console.log(error); }
        )
    }
}
