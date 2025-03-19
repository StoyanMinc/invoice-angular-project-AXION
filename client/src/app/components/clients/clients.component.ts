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
    clientData: any = {};
    isModalOpen: boolean = false;
    isEditModalOpen: boolean = false;

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

    openEditModal() {
        this.isEditModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
        this.isEditModalOpen = false;
        this.clientData = {};
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
    };

    openModalForEdit(clientId) {
        this.system.GetOneClient(clientId).subscribe(
            (response) => {
                this.clientData = response;
                this.openEditModal();
            },
            (error) => { console.log(error); }
        );
    }

    editClient(clientId) {
        this.system.EditClient(clientId, this.clientData).subscribe(
            (response) => {
                const indexOfClient = this.clients.findIndex(client => client._id === clientId);
                this.clients[indexOfClient] = response;
                this.closeModal();
                
            },
            (error) => { console.log(error); }
        )
    }

    deleteClient(clientId) {
        this.system.DeleteClient(clientId).subscribe(
            (response) => {
                this.clients = this.clients.filter(client => client._id !== clientId);
            },
            (error) => { console.log(error); }
        )
    }
}
