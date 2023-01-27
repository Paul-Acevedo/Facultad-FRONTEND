import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosInsertUpdateComponent } from './parametros-insert-update.component';

describe('ParametrosInsertUpdateComponent', () => {
  let component: ParametrosInsertUpdateComponent;
  let fixture: ComponentFixture<ParametrosInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
