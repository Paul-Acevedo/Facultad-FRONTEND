import { TestBed } from '@angular/core/testing';

import { ProveedoresPackageService } from './proveedores-package.service';

describe('ProveedoresPackageService', () => {
  let service: ProveedoresPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedoresPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
