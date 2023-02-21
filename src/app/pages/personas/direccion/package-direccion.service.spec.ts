import { TestBed } from '@angular/core/testing';

import { PackageDireccionService } from './package-direccion.service';

describe('PackageDireccionService', () => {
  let service: PackageDireccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageDireccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
