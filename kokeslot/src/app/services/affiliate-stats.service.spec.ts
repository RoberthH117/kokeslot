import { TestBed } from '@angular/core/testing';

import { AffiliateStatsService } from './affiliate-stats.service';

describe('AffiliateStatsService', () => {
  let service: AffiliateStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffiliateStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
