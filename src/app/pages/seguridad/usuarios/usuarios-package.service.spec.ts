import { TestBed } from '@angular/core/testing';

import { UsuariosPackageService } from './usuarios-package.service';

describe('UsuariosPackageService', () => {
  let service: UsuariosPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
