import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasInsertUpdateComponent } from './preguntas-insert-update.component';

describe('PreguntasInsertUpdateComponent', () => {
  let component: PreguntasInsertUpdateComponent;
  let fixture: ComponentFixture<PreguntasInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntasInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
