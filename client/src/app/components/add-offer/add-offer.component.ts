import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SystemService } from '../../system.service';
import { UtilityService } from '../../utility.service';
import { Offer } from '../../classes.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-offer',
    imports: [CommonModule, FormsModule],
    templateUrl: './add-offer.component.html',
    styleUrl: './add-offer.component.css'
})
export class AddOfferComponent {

    selectOption: string = 'основна информация';
    offerData: any = {};
    clients: any = [];

    constructor( public router: Router, public system: SystemService, public utility: UtilityService) {
        const todaysDate = utility.getTodaysDate();
        this.offerData = new Offer('', '', 'обект', todaysDate, '', [{ name: "", qty: 0, unitPrice: 0.00, measure: 'br', to: 0 }])
        system.GetClients().subscribe(
            (response) => {
                this.clients = response;
                this.offerData.client = this.clients[0]._id;
                this.offerData.mol = this.clients[0].mol;
            },
            (error) => { console.log(error) }
        )
    }

    createOffer() {
        this.offerData.products = this.offerData.products.filter(p => p.name !== '' && p.qty > 0);
        this.offerData.totalPrice = this.utility.ReturnTotalWithVAT(this.offerData);
        this.system.CreateOffer(this.offerData).subscribe(
            (response) => { this.router.navigate(['/documents/offers']) },
            (error) => { console.log(error); }
        )
    }

    setSelectOption(option: string) {
        this.selectOption = option;
    };

    selectMol() {
        let client_id = this.offerData.client;
        this.offerData.mol = this.clients.filter(client => client._id == client_id)[0].mol;
    }


    CheckForNewRow(product, idx) {
        if (idx == this.offerData.products.length - 1) {
            if (product.name.length > 0 || product.unitPrice > 0 || product.qty > 0) {
                this.offerData.products.push({ name: "", qty: 0, unitPrice: 0.00, unit: 'бр.', discount: 0 });
            }
        }
    };
    RemoveRow(idx) { this.offerData.products.splice(idx, 1); }
}
