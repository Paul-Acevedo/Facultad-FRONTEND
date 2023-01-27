import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasInsertUpdateComponent } from './personas-insert-update.component';

describe('PersonasInsertUpdateComponent', () => {
  let component: PersonasInsertUpdateComponent;
  let fixture: ComponentFixture<PersonasInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonasInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
