import { TestBed } from '@angular/core/testing';

import { TipoClientesService } from './tipo-clientes.service';

describe('TipoClientesService', () => {
  let service: TipoClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
