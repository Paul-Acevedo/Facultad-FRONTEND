import { TestBed } from '@angular/core/testing';

import { PersonasPackageService } from './personas-package.service';

describe('PersonasPackageService', () => {
  let service: PersonasPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
