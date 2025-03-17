import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncomingInvoiceComponent } from './edit-incoming-invoice.component';

describe('EditIncomingInvoiceComponent', () => {
  let component: EditIncomingInvoiceComponent;
  let fixture: ComponentFixture<EditIncomingInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIncomingInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIncomingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
