import { TestBed } from '@angular/core/testing';

import { VolunteeringService } from './volunteering-service';

describe('VolunteeringService', () => {
  let service: VolunteeringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteeringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
