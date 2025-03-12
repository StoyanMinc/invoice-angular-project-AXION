import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    constructor(private system: SystemService) {
        this.system.GetIncomingInvoices().subscribe(
            (result) => { this.invoices = result, console.log(result); },
            (error) => { console.log(error.message); }
        )
    }

    CalculateTotalInvoicePrice() {
        const totalPrice = this.invoices.map(i => i.sumForPay).reduce((a, c) => a + c, 0) || 0;
        return totalPrice;
    }
}
