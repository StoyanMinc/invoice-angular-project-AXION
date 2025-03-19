import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAutomaticInvoiceComponent } from './edit-automatic-invoice.component';

describe('EditAutomaticInvoiceComponent', () => {
  let component: EditAutomaticInvoiceComponent;
  let fixture: ComponentFixture<EditAutomaticInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAutomaticInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAutomaticInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
