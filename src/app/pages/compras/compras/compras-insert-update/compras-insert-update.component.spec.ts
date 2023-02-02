import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasInsertUpdateComponent } from './compras-insert-update.component';

describe('ComprasInsertUpdateComponent', () => {
  let component: ComprasInsertUpdateComponent;
  let fixture: ComponentFixture<ComprasInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
