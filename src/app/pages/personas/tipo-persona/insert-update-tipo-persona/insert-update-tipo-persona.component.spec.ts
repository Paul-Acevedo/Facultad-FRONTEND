import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateTipoPersonaComponent } from './insert-update-tipo-persona.component';

describe('InsertUpdateTipoPersonaComponent', () => {
  let component: InsertUpdateTipoPersonaComponent;
  let fixture: ComponentFixture<InsertUpdateTipoPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertUpdateTipoPersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertUpdateTipoPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
