import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesInsertUpdateComponent } from './roles-insert-update.component';

describe('RolesInsertUpdateComponent', () => {
  let component: RolesInsertUpdateComponent;
  let fixture: ComponentFixture<RolesInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
