import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisminuirProductosComponent } from './disminuir-productos.component';

describe('DisminuirProductosComponent', () => {
  let component: DisminuirProductosComponent;
  let fixture: ComponentFixture<DisminuirProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisminuirProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisminuirProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
