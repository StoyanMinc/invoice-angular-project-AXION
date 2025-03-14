import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SystemService } from '../../system.service';
import { UtilityService } from '../../utility.service';
import { IncomingInvoice } from '../../classes.service';

@Component({
    selector: 'app-add-incoming-invoice',
    imports: [HttpClientModule, FormsModule, CommonModule],
    templateUrl: './add-incoming-invoice.component.html',
    styleUrl: './add-incoming-invoice.component.css'
})
export class AddIncomingInvoiceComponent {

    invoiceData: any;
    
    constructor(public http: HttpClient, public system: SystemService, public router: Router, public utility: UtilityService) {
        const todaysDate = utility.getTodaysDate();
        this.invoiceData = new IncomingInvoice('', '', todaysDate, '', '15', 'Банков превод', '', 'лв');
        this.invoiceData.invoiceFileHandler = '';
    }

    createInvoice() {
        const invoiceData = this.invoiceData;
        invoiceData.invoiceDate = this.utility.FormatDate(invoiceData.invoiceDate);
        invoiceData.expireDate = this.utility.CalculateExpireDate(invoiceData.invoiceDate, invoiceData.paymentTerm);

        this.system.CreateIncomingInvoice(invoiceData).subscribe(
            (response) => {
                console.log('Created invoice successfuly!', response);
                this.router.navigate(['/documents/expenses']);
            },
            (error) => {
                console.log('Something crash', error.message);
            }
        );
    }


    openFileManagement(event: any) {
        event.preventDefault();
    
        const fileManager = document.getElementById("invoiceFile");
        fileManager?.click();
    }

    onFileChange(event: any) {
        let file = event.target.files;
        // for (let i = 0; i < files.length; i++) {
        //     this.getBase64(files[i]).then(
        //         data => this.invoiceData.files.push({ name: files[i].name, 'data': data })
        //     );
        // }
        this.getBase64(file[0])
        .then(data => this.invoiceData.invoiceFileHandler = data)
        .catch(error => console.log(error));
        
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

}
