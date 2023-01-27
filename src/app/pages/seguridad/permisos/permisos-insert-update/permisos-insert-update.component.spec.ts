import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosInsertUpdateComponent } from './permisos-insert-update.component';

describe('PermisosInsertUpdateComponent', () => {
  let component: PermisosInsertUpdateComponent;
  let fixture: ComponentFixture<PermisosInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisosInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
