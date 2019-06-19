import { TestBed } from '@angular/core/testing';

import { WPRestAPIService } from './wprest-api.service';

describe('WPRestAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WPRestAPIService = TestBed.get(WPRestAPIService);
    expect(service).toBeTruthy();
  });
});
