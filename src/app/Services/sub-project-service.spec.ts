import { TestBed } from '@angular/core/testing';

import { SubProjectService } from './sub-project-service';

describe('SubProjectService', () => {
  let service: SubProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
