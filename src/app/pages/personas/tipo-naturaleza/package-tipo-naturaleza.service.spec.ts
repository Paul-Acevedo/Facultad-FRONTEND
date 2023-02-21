import { TestBed } from '@angular/core/testing';

import { PackageTipoNaturalezaService } from './package-tipo-naturaleza.service';

describe('PackageTipoNaturalezaService', () => {
  let service: PackageTipoNaturalezaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageTipoNaturalezaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
