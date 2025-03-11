import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SystemService } from '../../system.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-sales',
    imports: [FormsModule, HttpClientModule, CommonModule],
    templateUrl: './add-sales.component.html',
    styleUrl: './add-sales.component.css'
})
export class AddSalesComponent {

    clients: any;

    invoiceData: any = {
        client: '',
        mol: '',
        documentType: '',
        invoiceNumber: '',
        invoiceDate: '',
        paymentTerm: '',
        paymentType: '',
        bankChoise: '',
        products: [],
        totalPrice: 0.00
    }



    constructor(private http: HttpClient, public system: SystemService) {
        this.system.GetClients().subscribe(
            (response) => { this.clients = response; },
            (error) => { console.log(error.message); }
        );
    }


    createInvoice() {
        const invoiceData = this.invoiceData;

        this.system.CreateInvoice(invoiceData).subscribe(
            (response) => {
                console.log('Created invoice successfuly!', response);
            },
            (error) => {
                console.log('Something crash', error.message);
            }
        );
    }
}
