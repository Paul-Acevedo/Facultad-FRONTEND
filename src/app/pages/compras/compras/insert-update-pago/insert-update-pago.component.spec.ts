import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdatePagoComponent } from './insert-update-pago.component';

describe('InsertUpdatePagoComponent', () => {
  let component: InsertUpdatePagoComponent;
  let fixture: ComponentFixture<InsertUpdatePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertUpdatePagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertUpdatePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
