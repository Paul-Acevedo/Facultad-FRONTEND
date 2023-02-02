import { TestBed } from '@angular/core/testing';

import { ComprasPackageService } from './compras-package.service';

describe('ComprasPackageService', () => {
  let service: ComprasPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprasPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
