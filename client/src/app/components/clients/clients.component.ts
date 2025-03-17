import { Component } from '@angular/core';
import { SystemService } from '../../system.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Client } from '../../classes.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-clients',
    imports: [CommonModule, FormsModule],
    templateUrl: './clients.component.html',
    styleUrl: './clients.component.css'
})
export class ClientsComponent {

    clients: any[] = [];
    clientData: any;
    isModalOpen: boolean = false;

    constructor(public router: Router, public system: SystemService) {
        this.clientData = new Client('', '', '', '', '', '', '', '', '', '', '');

        system.GetClients().subscribe(
            (response) => { this.clients = response; },
            (error) => { console.log(error); }
        )
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    createClient() {
        console.log(this.clientData);
        this.system.CreateClient(this.clientData).subscribe(
            (response) => { 
                this.clients.push(response);
                this.closeModal();
             },
            (error) => { console.log(error); }
        )
    }

}
