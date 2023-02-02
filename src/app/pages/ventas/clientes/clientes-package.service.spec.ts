import { TestBed } from '@angular/core/testing';

import { ClientesPackageService } from './clientes-package.service';

describe('ClientesPackageService', () => {
  let service: ClientesPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
