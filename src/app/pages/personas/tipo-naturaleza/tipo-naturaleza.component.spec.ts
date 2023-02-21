import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoNaturalezaComponent } from './tipo-naturaleza.component';

describe('TipoNaturalezaComponent', () => {
  let component: TipoNaturalezaComponent;
  let fixture: ComponentFixture<TipoNaturalezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoNaturalezaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoNaturalezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
