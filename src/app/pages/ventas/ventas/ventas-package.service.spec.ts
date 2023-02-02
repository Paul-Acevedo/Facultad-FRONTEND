import { TestBed } from '@angular/core/testing';

import { VentasPackageService } from './ventas-package.service';

describe('VentasPackageService', () => {
  let service: VentasPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentasPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
