import { TestBed } from '@angular/core/testing';

import { PackageTipoPersonaService } from './package-tipo-persona.service';

describe('PackageTipoPersonaService', () => {
  let service: PackageTipoPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageTipoPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
