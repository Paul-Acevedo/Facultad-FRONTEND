import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateComponent } from './insert-update.component';

describe('InsertUpdateComponent', () => {
  let component: InsertUpdateComponent;
  let fixture: ComponentFixture<InsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
