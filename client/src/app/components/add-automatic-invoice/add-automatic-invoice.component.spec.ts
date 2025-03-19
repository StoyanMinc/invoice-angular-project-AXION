import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutomaticInvoiceComponent } from './add-automatic-invoice.component';

describe('AddAutomaticInvoiceComponent', () => {
  let component: AddAutomaticInvoiceComponent;
  let fixture: ComponentFixture<AddAutomaticInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAutomaticInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAutomaticInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
