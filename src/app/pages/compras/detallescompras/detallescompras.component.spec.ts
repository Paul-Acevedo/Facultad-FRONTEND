import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallescomprasComponent } from './detallescompras.component';

describe('DetallescomprasComponent', () => {
  let component: DetallescomprasComponent;
  let fixture: ComponentFixture<DetallescomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallescomprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallescomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
