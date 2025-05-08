import { TestBed } from '@angular/core/testing';

import { PathwayServiceService } from './pathway-service.service';

describe('PathwayServiceService', () => {
  let service: PathwayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathwayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
