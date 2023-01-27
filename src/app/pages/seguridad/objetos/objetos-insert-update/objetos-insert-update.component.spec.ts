import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetosInsertUpdateComponent } from './objetos-insert-update.component';

describe('ObjetosInsertUpdateComponent', () => {
  let component: ObjetosInsertUpdateComponent;
  let fixture: ComponentFixture<ObjetosInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetosInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetosInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
