import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesInsertUpdateComponent } from './clientes-insert-update.component';

describe('ClientesInsertUpdateComponent', () => {
  let component: ClientesInsertUpdateComponent;
  let fixture: ComponentFixture<ClientesInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesInsertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
