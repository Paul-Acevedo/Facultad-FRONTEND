import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateCalendarioComponent } from './insert-update-calendario.component';

describe('InsertUpdateCalendarioComponent', () => {
  let component: InsertUpdateCalendarioComponent;
  let fixture: ComponentFixture<InsertUpdateCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertUpdateCalendarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertUpdateCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
