import { TestBed } from '@angular/core/testing';

import { PackageTipoTelefonoService } from './package-tipo-telefono.service';

describe('PackageTipoTelefonoService', () => {
  let service: PackageTipoTelefonoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageTipoTelefonoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
