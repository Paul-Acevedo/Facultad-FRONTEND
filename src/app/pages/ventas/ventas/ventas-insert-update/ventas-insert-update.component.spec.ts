import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasInsertUpdateComponent } from './ventas-insert-update.component';

describe('VentasInsertUpdateComponent', () => {
  let component: VentasInsertUpdateComponent;
  let fixture: ComponentFixture<VentasInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
