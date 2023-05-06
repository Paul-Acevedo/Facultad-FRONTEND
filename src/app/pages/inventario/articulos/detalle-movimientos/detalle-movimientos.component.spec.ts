import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMovimientosComponent } from './detalle-movimientos.component';

describe('DetalleMovimientosComponent', () => {
  let component: DetalleMovimientosComponent;
  let fixture: ComponentFixture<DetalleMovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleMovimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
