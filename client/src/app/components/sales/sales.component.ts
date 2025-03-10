import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-sales',
    imports: [CommonModule, RouterLink],
    templateUrl: './sales.component.html',
    styleUrl: './sales.component.css'
})
export class SalesComponent {
    options: string[] = ['Всички', 'Фактури', 'Проформа фактури'];

    selectedOption: string = '';

    selectOption(option: string) {
        this.selectedOption = option;
    }

}