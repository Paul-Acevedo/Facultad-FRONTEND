import { TestBed } from '@angular/core/testing';

import { PackageTelefonoService } from './package-telefono.service';

describe('PackageTelefonoService', () => {
  let service: PackageTelefonoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageTelefonoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
