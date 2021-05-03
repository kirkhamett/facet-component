import { TestBed } from '@angular/core/testing';

import { FacetService } from './facet.service';

describe('FacetService', () => {
  let service: FacetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
