import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosInsertUpdateComponent } from './articulos-insert-update.component';

describe('ArticulosInsertUpdateComponent', () => {
  let component: ArticulosInsertUpdateComponent;
  let fixture: ComponentFixture<ArticulosInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
