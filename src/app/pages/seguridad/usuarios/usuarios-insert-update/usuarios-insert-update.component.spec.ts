import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosInsertUpdateComponent } from './usuarios-insert-update.component';

describe('UsuariosInsertUpdateComponent', () => {
  let component: UsuariosInsertUpdateComponent;
  let fixture: ComponentFixture<UsuariosInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
