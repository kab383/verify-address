import { TestBed } from '@angular/core/testing';

import { UspsApiService } from './usps-api.service';

describe('UspsApiService', () => {
  let service: UspsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UspsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
