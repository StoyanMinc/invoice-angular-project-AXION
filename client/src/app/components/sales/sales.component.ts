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

    invoices: any;

    constructor(private system: SystemService) {
        this.system.GetInvoices().subscribe(
            (result) => {this.invoices = result; console.log(result);},
            (error) => {console.log(error.message);}
        )
    }

    selectOption(option: string) {
        this.selectedOption = option;
    }

}