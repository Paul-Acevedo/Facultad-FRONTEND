import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuPreguntasComponent } from './recu-preguntas.component';

describe('RecuPreguntasComponent', () => {
  let component: RecuPreguntasComponent;
  let fixture: ComponentFixture<RecuPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuPreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
