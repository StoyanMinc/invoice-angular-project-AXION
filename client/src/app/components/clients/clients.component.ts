import { Component } from '@angular/core';
import { SystemService } from '../../system.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-clients',
    imports: [CommonModule],
    templateUrl: './clients.component.html',
    styleUrl: './clients.component.css'
})
export class ClientsComponent {

    clients: any[] = [];
    isModalOpen: boolean = false;

    constructor(public router: Router, public system: SystemService) {
        system.GetClients().subscribe(
            (response) => { this.clients = response; console.log(this.clients); },
            (error) => { console.log(error); }
        )
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }
}
