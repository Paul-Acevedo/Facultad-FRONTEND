import { TestBed } from '@angular/core/testing';

import { PermisosPackageService } from './permisos-package.service';

describe('PermisosPackageService', () => {
  let service: PermisosPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
