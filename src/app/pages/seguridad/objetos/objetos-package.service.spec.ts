import { TestBed } from '@angular/core/testing';

import { ObjetosPackageService } from './objetos-package.service';

describe('ObjetosPackageService', () => {
  let service: ObjetosPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetosPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
