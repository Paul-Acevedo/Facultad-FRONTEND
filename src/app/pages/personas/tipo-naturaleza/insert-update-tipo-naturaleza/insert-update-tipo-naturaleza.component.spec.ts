import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateTipoNaturalezaComponent } from './insert-update-tipo-naturaleza.component';

describe('InsertUpdateTipoNaturalezaComponent', () => {
  let component: InsertUpdateTipoNaturalezaComponent;
  let fixture: ComponentFixture<InsertUpdateTipoNaturalezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertUpdateTipoNaturalezaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertUpdateTipoNaturalezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
