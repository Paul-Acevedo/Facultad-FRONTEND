import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateEmpresaComponent } from './insert-update-empresa.component';

describe('InsertUpdateEmpresaComponent', () => {
  let component: InsertUpdateEmpresaComponent;
  let fixture: ComponentFixture<InsertUpdateEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertUpdateEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertUpdateEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
