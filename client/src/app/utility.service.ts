import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor() { }

    ReturnFixed(val) { return val.toFixed(2); }

    ReturnTotalWithoutVAT(invoiceData) {
        let total = 0;
        for (var pi = 0; pi < invoiceData.products.length; pi++) {
            total += invoiceData.products[pi].unitPrice * invoiceData.products[pi].qty;
        }
        return total;
    }

    ReturnTotalWithVAT(invoiceData) {
        let total = 0;

        for (const product of invoiceData.products) {
            total += product.unitPrice * product.qty
        };

        return total * 1.2;
    }

    FormatDate(date) {
        if (typeof date === "string") {
            const splitedDate = date.split(".");
            const day = parseInt(splitedDate[0], 10);
            const month = parseInt(splitedDate[1], 10) - 1;
            const year = parseInt(splitedDate[2], 10);
            date = new Date(year, month, day);
        }
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = String(date.getFullYear());

        return `${day}.${month}.${year}`;
    }

    CalculateExpireDate(date, paymentTerm) {

        const reformed_date = date.split(".");
        const expirationDate = new Date(reformed_date[2] + "-" + reformed_date[1] + "-" + reformed_date[0]);
        expirationDate.setDate(expirationDate.getDate() + parseInt(paymentTerm));
        const reformed_expireDate = this.FormatDate(expirationDate);

        return reformed_expireDate;
    };

    getTodaysDate() {
        const date = new Date();
        const todaysDate = date.toLocaleDateString('en-GB').replace(/\//g, '.');
        return todaysDate;
    }
}
