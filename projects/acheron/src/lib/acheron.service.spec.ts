import { TestBed } from '@angular/core/testing';

import { AcheronService } from './acheron.service';

describe('AcheronService', () => {
  let service: AcheronService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcheronService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
