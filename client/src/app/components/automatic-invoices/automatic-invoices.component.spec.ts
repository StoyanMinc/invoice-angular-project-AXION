import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticInvoicesComponent } from './automatic-invoices.component';

describe('AutomaticInvoicesComponent', () => {
  let component: AutomaticInvoicesComponent;
  let fixture: ComponentFixture<AutomaticInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomaticInvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomaticInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
