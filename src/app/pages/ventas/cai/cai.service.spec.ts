import { TestBed } from '@angular/core/testing';

import { CaiService } from './cai.service';

describe('CaiService', () => {
  let service: CaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
