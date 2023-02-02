import { TestBed } from '@angular/core/testing';

import { ArticulosPackageService } from './articulos-package.service';

describe('ArticulosPackageService', () => {
  let service: ArticulosPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticulosPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
