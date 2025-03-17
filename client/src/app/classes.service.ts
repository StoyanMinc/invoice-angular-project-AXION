import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ClassesService {

    constructor() { }
}


export class Invoice {
    client: any;
    mol: any;
    documentType: any;
    invoiceNumber: any;
    invoiceDate: any;
    paymentTerm: any;
    paymentType: any;
    bankChoice: any;
    products: any = [];

    constructor(client, mol, documentType, invoiceNumber, invoiceDate, paymentTerm, paymentType, bankChoice, products) {
        this.client = client;
        this.mol = mol;
        this.documentType = documentType;
        this.invoiceNumber = invoiceNumber;
        this.invoiceDate = invoiceDate;
        this.paymentTerm = paymentTerm;
        this.paymentType = paymentType;
        this.bankChoice = bankChoice;
        let products_list: any = [];
        for (var pi = 0; pi < products.length; pi++) {
            products_list.push(new Product(products[pi].name, products[pi].qty, products[pi].measure, products[pi].unitPrice, products[pi].to));
        };
        this.products = products_list;
    };
};

class Product {
    name: any;
    qty: any;
    measure: any;
    unitPrice: any;
    to: any;

    constructor(name, qty, measure, unitPrice, to) {
        this.name = name;
        this.qty = qty;
        this.measure = measure;
        this.unitPrice = unitPrice;
        this.to = to;
    };
};

export class IncomingInvoice {
    supplier: any;
    invoiceNumber: any;
    invoiceDate: any;
    comment: any;
    paymentTerm: any;
    paymentType: any;
    sumForPay: any;
    currency: any;


    constructor(supplier, invoiceNumber, invoiceDate, comment, paymentTerm, paymentType, sumForPay, currency) {
        this.supplier = supplier
        this.invoiceNumber = invoiceNumber
        this.invoiceDate = invoiceDate
        this.comment = comment
        this.paymentTerm = paymentTerm
        this.paymentType = paymentType
        this.sumForPay = sumForPay
        this.currency = currency
    };
};

export class Client {

    typeOfClient: any;
    nameOfClient: any;
    mol: any;
    eikEgn: any;
    identN: any;
    address: any;
    city: any;
    country: any;
    email: any;
    phoneNumber: any;
    webSite: any;

    constructor(typeOfClient, nameOfClient, mol, eikEgn, identN, address, city, country, email, phoneNumber, webSite) {
        this.typeOfClient = typeOfClient
        this.nameOfClient = nameOfClient
        this.mol = mol
        this.eikEgn = eikEgn
        this.identN = identN
        this.address = address
        this.city = city
        this.country = country
        this.email = email
        this.phoneNumber = phoneNumber
        this.webSite = webSite
    }
};