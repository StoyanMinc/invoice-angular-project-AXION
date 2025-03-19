import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SystemService } from '../../system.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-offers',
    imports: [RouterLink, CommonModule],
    templateUrl: './offers.component.html',
    styleUrl: './offers.component.css'
})
export class OffersComponent {

    offers: any = [];

    constructor(public system: SystemService) {
        this.system.GetOffers().subscribe(
            (response) => { this.offers = response },
            (error) => { console.log(error); }
        )
    }

    deleteOffer(offerId) {
        this.system.DeleteOffer(offerId).subscribe(
            (response) => {
                console.log(response);
                this.offers = this.offers.filter(offer => offer._id !== offerId);
            },
            (error) => { console.log(error); }
        )
    }



}
