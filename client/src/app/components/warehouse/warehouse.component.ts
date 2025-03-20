import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SystemService } from '../../system.service';
import { TmplAstDeferredBlockLoading } from '@angular/compiler';
import { subscribeOn } from 'rxjs';

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

    warehouses: any = [];
    parts: any = [];

    partData = {
        name: '',
        qty: '',
        storageType: 'реален',
        priceIn: '',
        priceOut: '',
        number: 0,
        subType: 'части',
        storageId: '',
    };
    warehouseData = {
        name: '',
        type: 'реален',
        productTypeHandling: 'FIFO',
        lastStorageCode: 0
    }

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
    }

    selectOption(option: string) {
        console.log(option);
        this.selectedOption = option;
        this.system.GetSpecificParts(option).subscribe(
            (response) => { this.parts = response },
            (error) => { console.log(error); }
        )
    }

    createPart() {
        this.partData.storageId = this.selectedOption;
        this.system.CreatePart(this.partData).subscribe(
            (response) => {
                this.parts.push(response);
                this.closeModal();
                this.partData = {
                    name: '',
                    qty: '',
                    storageType: 'реален',
                    priceIn: '',
                    priceOut: '',
                    number: 0,
                    subType: 'части',
                    storageId: '',
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
    }

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
    }

    openModal() {
        this.isModalOpen = true;
        if (this.parts.length > 0) {
            this.partData.number = this.parts[this.parts.length - 1].number + 1;
        } else {
            console.log(this.warehouses);
            this.partData.number = this.warehouses.find(w => w._id === this.selectedOption).lastStorageCode + 1;
        }
    }

    openWarehoseModal() {
        this.isAddWareHoseModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
        this.isAddWareHoseModalOpen = false;
    }
}
