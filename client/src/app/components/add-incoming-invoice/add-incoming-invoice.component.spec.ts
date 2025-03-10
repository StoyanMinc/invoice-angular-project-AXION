import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncomingInvoiceComponent } from './add-incoming-invoice.component';

describe('AddIncomingInvoiceComponent', () => {
  let component: AddIncomingInvoiceComponent;
  let fixture: ComponentFixture<AddIncomingInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIncomingInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIncomingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
