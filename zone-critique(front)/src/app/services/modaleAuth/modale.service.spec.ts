import { TestBed } from '@angular/core/testing';

import { ModaleService } from './modale.service';

describe('ModaleService', () => {
  let service: ModaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
