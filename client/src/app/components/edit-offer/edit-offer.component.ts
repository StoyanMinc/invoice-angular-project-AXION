import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../system.service';
import { UtilityService } from '../../utility.service';
import { Offer } from '../../classes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit-offer',
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-offer.component.html',
    styleUrl: './edit-offer.component.css'
})
export class EditOfferComponent implements OnInit {
    selectOption: string = 'основна информация';
    offerData: any = {};
    clients: any = [];
    offerId: string = '';

    constructor(public router: Router, public routerId: ActivatedRoute, public system: SystemService, public utility: UtilityService) {
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

    ngOnInit(): void {
        this.routerId.paramMap.subscribe(params => {
            this.offerId = params.get('offerId') ?? 'undefined';
            this.system.GetOneOffer(this.offerId).subscribe(
                (response) => { console.log(response); this.offerData = response },
                (error) => { console.log(error); }
            )
        })
    }

    editOffer() {
        this.offerData.products = this.offerData.products.filter(p => p.name !== '' && p.qty > 0);
        this.offerData.totalPrice = this.utility.ReturnTotalWithVAT(this.offerData);
        this.system.EditOffer(this.offerId, this.offerData).subscribe(
            (response) => { this.router.navigate(['/documents/offers']) },
            (error) => { console.log(error); }
        )
    };

    setSelectOption(option: string) {
        this.selectOption = option;
    };

    selectMol() {
        const clientId = this.offerData.client._id;
        this.offerData.mol = this.clients.find(client => client._id === clientId).mol;
    };


    CheckForNewRow(product, idx) {
        if (idx == this.offerData.products.length - 1) {
            if (product.name.length > 0 || product.unitPrice > 0 || product.qty > 0) {
                this.offerData.products.push({ name: "", qty: 0, unitPrice: 0.00, unit: 'бр.', discount: 0 });
            }
        }
    };
    RemoveRow(idx) { this.offerData.products.splice(idx, 1); }
}

