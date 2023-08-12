import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateCaiComponent } from './insert-update-cai.component';

describe('InsertUpdateCaiComponent', () => {
  let component: InsertUpdateCaiComponent;
  let fixture: ComponentFixture<InsertUpdateCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertUpdateCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertUpdateCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
