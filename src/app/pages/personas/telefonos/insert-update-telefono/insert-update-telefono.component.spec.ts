import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateTelefonoComponent } from './insert-update-telefono.component';

describe('InsertUpdateTelefonoComponent', () => {
  let component: InsertUpdateTelefonoComponent;
  let fixture: ComponentFixture<InsertUpdateTelefonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertUpdateTelefonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertUpdateTelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
