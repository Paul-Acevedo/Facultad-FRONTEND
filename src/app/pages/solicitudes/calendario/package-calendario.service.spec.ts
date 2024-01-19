import { TestBed } from '@angular/core/testing';

import { PackageCalendarioService } from './package-calendario.service';

describe('PackageCalendarioService', () => {
  let service: PackageCalendarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageCalendarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
