import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasInsertUpdateComponent } from './categorias-insert-update.component';

describe('CategoriasInsertUpdateComponent', () => {
  let component: CategoriasInsertUpdateComponent;
  let fixture: ComponentFixture<CategoriasInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
