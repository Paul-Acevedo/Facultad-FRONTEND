import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaiComponent } from './cai.component';

describe('CaiComponent', () => {
  let component: CaiComponent;
  let fixture: ComponentFixture<CaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
