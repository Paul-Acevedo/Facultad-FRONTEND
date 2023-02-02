import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresInsertUpdateComponent } from './proveedores-insert-update.component';

describe('ProveedoresInsertUpdateComponent', () => {
  let component: ProveedoresInsertUpdateComponent;
  let fixture: ComponentFixture<ProveedoresInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedoresInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
