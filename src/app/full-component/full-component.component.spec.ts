import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullComponentComponent } from './full-component.component';

describe('FullComponentComponent', () => {
  let component: FullComponentComponent;
  let fixture: ComponentFixture<FullComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
