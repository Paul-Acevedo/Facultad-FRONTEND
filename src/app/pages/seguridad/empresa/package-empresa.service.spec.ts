import { TestBed } from '@angular/core/testing';

import { PackageEmpresaService } from './package-empresa.service';

describe('PackageEmpresaService', () => {
  let service: PackageEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
