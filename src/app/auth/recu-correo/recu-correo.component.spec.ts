import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuCorreoComponent } from './recu-correo.component';

describe('RecuCorreoComponent', () => {
  let component: RecuCorreoComponent;
  let fixture: ComponentFixture<RecuCorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuCorreoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
