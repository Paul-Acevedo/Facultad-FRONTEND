import { TestBed } from '@angular/core/testing';

import { ParametrosInsertUpdateService } from './parametros-insert-update.service';

describe('ParametrosInsertUpdateService', () => {
  let service: ParametrosInsertUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametrosInsertUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
