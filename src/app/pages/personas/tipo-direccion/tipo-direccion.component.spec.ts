import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDireccionComponent } from './tipo-direccion.component';

describe('TipoDireccionComponent', () => {
  let component: TipoDireccionComponent;
  let fixture: ComponentFixture<TipoDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoDireccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
