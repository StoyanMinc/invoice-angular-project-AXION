import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SystemService } from '../../system.service';

@Component({
    selector: 'app-warehouse',
    imports: [FormsModule, CommonModule],
    templateUrl: './warehouse.component.html',
    styleUrl: './warehouse.component.css'
})

export class WarehouseComponent implements OnInit {

    selectedOption: string = '67dc13728621b27c5c6016cb';
    isModalOpen: boolean = false;
    isAddWareHoseModalOpen: boolean = false;
    isEditModalOpen: boolean = false;
    isMovePartModalOpen: boolean = false;

    warehouses: any = [];
    parts: any = [];
    currentStorage: string = '';
    warehousesOption: any = [];

    partData = {
        _id: '',
        name: '',
        qty: '',
        storageType: 'реален',
        priceIn: '',
        priceOut: '',
        number: 0,
        subType: 'части',
        storageId: ''
    };
    warehouseData = {
        name: '',
        type: 'реален',
        productTypeHandling: 'FIFO',
        lastStorageCode: 0
    };

    constructor(public system: SystemService) { }

    ngOnInit(): void {
        this.system.GetWarehouses().subscribe(
            (response) => { this.warehouses = response },
            (error) => { console.log(error); }
        )

        this.system.GetSpecificParts(this.selectedOption).subscribe(
            (response) => {
                this.parts = response;
            },
            (error) => { console.log(error); }
        )
    };

    selectOption(option: string) {
        this.selectedOption = option;
        this.system.GetSpecificParts(option).subscribe(
            (response) => { this.parts = response },
            (error) => { console.log(error); }
        )
    };

    createPart() {
        this.partData.storageId = this.selectedOption;
        this.system.CreatePart(this.partData).subscribe(
            (response) => {
                this.parts.push(response);
                this.closeModal();
                this.partData = {
                    _id: '',
                    name: '',
                    qty: '',
                    storageType: 'реален',
                    priceIn: '',
                    priceOut: '',
                    number: 0,
                    subType: 'части',
                    storageId: ''
                };
            },
            (error) => { console.log(error); }
        )
    };

    createWarehouse() {
        this.warehouseData.lastStorageCode = this.warehouses.sort((a, b) => a.lastStorageCode - b.lastStorageCode)[this.warehouses.length - 1].lastStorageCode + 1000000;
        this.system.CreateWarehouse(this.warehouseData).subscribe(
            (response) => { this.warehouses.push(response); this.closeModal() },
            (error) => { console.log(error); }
        )
    };

    editPart(partId) {
        this.system.EditPart(partId, this.partData).subscribe(
            (response) => {
                const indexOfClient = this.parts.findIndex(part => part._id === partId);
                this.parts[indexOfClient] = response;
                this.closeModal();
                // if(this.partData.storageId['_id'] !== undefined) {
                //     this.selectedOption = this.partData.storageId['_id'];
                // } else {
                //     this.selectedOption = this.partData.storageId;
                // }
                console.log(this.selectedOption);
                this.system.GetSpecificParts(this.selectedOption).subscribe(
                    (response) => {
                        this.parts = response;
                    },
                    (error) => { console.log(error); }
                )
            },
            (error) => { console.log(error); }
        );
    };

    deletePart(partId) {
        this.system.DeletePart(partId).subscribe(
            (response) => {
                console.log(response);
                this.parts = this.parts.filter(p => p._id !== partId);
            },
            (error) => {
                console.log({ error });
            }
        )
    };

    movePart(partId) {
        this.editPart(partId);
    }

    openWarehoseModal() {
        this.isAddWareHoseModalOpen = true;
    };

    openModal() {
        this.isModalOpen = true;
        if (this.parts.length > 0) {
            this.partData.number = this.parts[this.parts.length - 1].number + 1;
        } else {
            console.log(this.warehouses);
            this.partData.number = this.warehouses.find(w => w._id === this.selectedOption).lastStorageCode + 1;
        }
    };

    openEditModal(partId) {
        this.system.GetOnePart(partId).subscribe(
            (response) => {

                this.partData = response;
            },
            (error) => console.log({ error })
        )
        this.isEditModalOpen = true;
    };

    openMovePartModal(partId) {
        this.system.GetOnePart(partId).subscribe(
            (response) => {
                this.currentStorage = response.storageId.name;
                this.partData = response;
                this.partData.storageId = response.storageId._id;
                this.warehousesOption = this.warehouses.filter(s => s._id !== this.partData.storageId);
            },
            (error) => { console.log(error); }
        )


        this.isMovePartModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
        this.isAddWareHoseModalOpen = false;
        this.isEditModalOpen = false;
        this.isMovePartModalOpen = false;
    };


};
