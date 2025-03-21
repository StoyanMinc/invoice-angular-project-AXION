import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { SystemService } from '../../system.service';

@Component({
    selector: 'app-sales',
    imports: [CommonModule, RouterLink],
    templateUrl: './sales.component.html',
    styleUrl: './sales.component.css'
})
export class SalesComponent {

    selectedOption: string = 'Всички';
    allInvoices: any[] = [];
    invoicesToShow: any[] = [];

    constructor(private system: SystemService, private router: Router) {
        this.system.GetInvoices().subscribe(
            (result) => { this.allInvoices = result; this.invoicesToShow = result; },
            (error) => { console.log(error.message); }
        )
    }

    selectOption(option: string) {
        this.selectedOption = option;
    }

    ShowInvoiceOption(option: string) {
        if (option === 'Всички') {
            this.invoicesToShow = this.allInvoices
        } else if (option === 'Фактури') {
            this.invoicesToShow = this.allInvoices.filter(invoice => invoice.documentType === 'фактура');
        } else if (option === 'Проформа фактури') {
            this.invoicesToShow = this.allInvoices.filter(invoice => invoice.documentType === 'проформа');
        }
    }

    CalculateTotalInvoicePrice() {
        const totalPrice = this.invoicesToShow.map(i => i.totalPrice).reduce((a, c) => a + c, 0) || 0;
        return totalPrice;
    }

    DeleteInvoiceHandler(invoiceId: string) {
        this.system.DeleteInvoice(invoiceId).subscribe(
            (response) => {
                this.invoicesToShow = this.allInvoices.filter(invoice => invoice._id !== invoiceId);
            },
            (error) => { console.log(error); }
        )
    }
}