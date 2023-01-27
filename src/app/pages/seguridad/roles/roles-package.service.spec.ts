import { TestBed } from '@angular/core/testing';

import { RolesPackageService } from './roles-package.service';

describe('RolesPackageService', () => {
  let service: RolesPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
