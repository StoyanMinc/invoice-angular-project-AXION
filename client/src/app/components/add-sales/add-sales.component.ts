import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SystemService } from '../../system.service';
import { CommonModule } from '@angular/common';
import { UtilityService } from '../../utility.service';
import { Router } from '@angular/router';

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
        documentType: 'фактура',
        invoiceNumber: '',
        invoiceDate: '',
        paymentTerm: '15',
        paymentType: '',
        bankChoise: '',
        products: [
            {
                name: "",
                quantity: 0,
                price: 0.00,
                unit: 'бр.',
                discount: 0
            }
        ],
        totalPrice: 0
    }

    constructor(private http: HttpClient, public system: SystemService, public utility:UtilityService, private router: Router) {
        this.system.GetClients().subscribe(
            (response) => { this.clients = response; },
            (error) => { console.log(error.message); }
        );
        this.CreateInvoiceNumber();
    }

    createInvoice() {
        const invoiceData = this.invoiceData;
        invoiceData.invoiceDate = this.utility.FormatDate(invoiceData.invoiceDate);
        invoiceData.expireDate = this.utility.CalculateExpireDate(invoiceData.invoiceDate, invoiceData.paymentTerm);
        invoiceData.products = invoiceData.products.filter(p => p.name !== '' && p.quantity !== '');
        invoiceData.totalPrice = this.utility.ReturnTotalWithVAT(invoiceData);
        
        this.system.CreateInvoice(invoiceData).subscribe(
            (response) => {
                console.log('Created invoice successfuly!', response);
                this.router.navigate(['/documents/sales']);
            },
            (error) => {
                console.log('Something crash', error.message);
            }
        );
    }

    SelectedClient() {
        let client_id = this.invoiceData.client;
        this.invoiceData.mol = this.clients.filter(client => client._id == client_id)[0].mol;
    }

    CreateInvoiceNumber() {
        if (this.invoiceData.documentType === 'фактура') {
            this.system.GetLastInvoice().subscribe(
                (response) => {
                    console.log(response);
                    if (response.length === 0) {
                        this.invoiceData.invoiceNumber = 3000000001
                    } else {
                        this.invoiceData.invoiceNumber = response[0].invoiceNumber + 1;
                    }
                },
                (error) => { console.log(error); }
            )
        } else if (this.invoiceData.documentType === 'проформа') {
            this.system.GetLastProforma().subscribe(
                (response) => {
                    console.log(response);

                    if (response.length === 0) {
                        this.invoiceData.invoiceNumber = 3000000001
                    } else {
                        this.invoiceData.invoiceNumber = response[0].invoiceNumber + 1;
                    }
                },
                (error) => { console.log(error); }
            )
        }
    }

    CheckForNewRow(product, idx) {
        if (idx == this.invoiceData.products.length - 1) {
            if (product.name.length > 0 || product.price > 0 || product.quantity > 0) {
                this.invoiceData.products.push({ name: "", quantity: 0, price: 0.00, unit: 'бр.', discount: 0 });
            }
        }
    }
    RemoveRow(idx) { this.invoiceData.products.splice(idx, 1); }
}
