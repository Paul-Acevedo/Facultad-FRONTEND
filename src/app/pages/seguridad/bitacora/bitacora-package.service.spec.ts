import { TestBed } from '@angular/core/testing';

import { BitacoraPackageService } from './bitacora-package.service';

describe('BitacoraPackageService', () => {
  let service: BitacoraPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitacoraPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
