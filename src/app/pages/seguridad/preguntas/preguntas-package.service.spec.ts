import { TestBed } from '@angular/core/testing';

import { PreguntasPackageService } from './preguntas-package.service';

describe('PreguntasPackageService', () => {
  let service: PreguntasPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntasPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
