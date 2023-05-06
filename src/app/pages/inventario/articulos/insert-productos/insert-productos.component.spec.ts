import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProductosComponent } from './insert-productos.component';

describe('InsertProductosComponent', () => {
  let component: InsertProductosComponent;
  let fixture: ComponentFixture<InsertProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
