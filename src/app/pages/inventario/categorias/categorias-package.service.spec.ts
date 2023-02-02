import { TestBed } from '@angular/core/testing';

import { CategoriasPackageService } from './categorias-package.service';

describe('CategoriasPackageService', () => {
  let service: CategoriasPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
