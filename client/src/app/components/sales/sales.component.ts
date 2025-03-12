import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SystemService } from '../../system.service';

@Component({
    selector: 'app-sales',
    imports: [CommonModule, RouterLink],
    templateUrl: './sales.component.html',
    styleUrl: './sales.component.css'
})
export class SalesComponent {
    options: string[] = ['Всички', 'Фактури', 'Проформа фактури'];

    selectedOption: string = '';

    allInvoices: any[] = [];
    invoicesToShow: any[] = [];

    constructor(private system: SystemService) {
        this.system.GetInvoices().subscribe(
            (result) => {this.allInvoices = result; this.invoicesToShow = result; console.log(result);},
            (error) => {console.log(error.message);}
        )
    }

    selectOption(option: string) {
        this.selectedOption = option;
    }

    ShowInvoiceOption(option: string) {
        if(option === 'Всички') {
            this.invoicesToShow = this.allInvoices
        } else if (option=== 'Фактури') {
            this.invoicesToShow = this.allInvoices.filter(invoice => invoice.documentType === 'фактура');
        } else if (option === 'Проформа фактури') {
            this.invoicesToShow = this.allInvoices.filter(invoice => invoice.documentType === 'проформа');
        }
    }

    CalculateTotalInvoicePrice() {
        const totalPrice = this.invoicesToShow.map(i => i.totalPrice).reduce((a, c) => a + c, 0) || 0;
        return totalPrice;
    }
}