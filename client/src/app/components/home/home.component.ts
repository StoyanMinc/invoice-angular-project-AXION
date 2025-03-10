import { Component } from '@angular/core';
import { SystemService } from '../../system.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  lastInvoices: any;
  lastIncomingInvoices: any;
  
  constructor(public system: SystemService) {
    this.system.GetLastInvoices().subscribe(
      (response) => { this.lastInvoices = response; },
      (error) => { console.log(error); });

    this.system.GetLastIncomingInvoices().subscribe(
      (response) => { this.lastIncomingInvoices = response },
      (error) => { console.log(error); }
    );
  }

  ReturnInvoiceStatus(status) {
    if (status == 0) { return 'Чака плащане'; }
    else if (status == 1) { return 'Платена'; }
    else {
      return '';
    }
  };
}
