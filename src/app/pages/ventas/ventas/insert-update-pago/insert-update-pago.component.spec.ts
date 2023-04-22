import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdatePagVentasComponent } from './insert-update-pago.component';

describe('InsertUpdatePagoComponent', () => {
  let component: InsertUpdatePagVentasComponent;
  let fixture: ComponentFixture<InsertUpdatePagVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertUpdatePagVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertUpdatePagVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
