import { TestBed } from '@angular/core/testing';

import { PackageTipoDireccionService } from './package-tipo-direccion.service';

describe('PackageTipoDireccionService', () => {
  let service: PackageTipoDireccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageTipoDireccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
