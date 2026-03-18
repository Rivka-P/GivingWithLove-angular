import { TestBed } from '@angular/core/testing';

import { EichudService } from './eichud-service';

describe('EichudService', () => {
  let service: EichudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EichudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
