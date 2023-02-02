import { TestBed } from '@angular/core/testing';

import { InventarioPackageService } from './inventario-package.service';

describe('InventarioPackageService', () => {
  let service: InventarioPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
