import { TestBed } from '@angular/core/testing';

import { FacetObserverService } from './facet-observer.service';

describe('FacetObserversService', () => {
  let service: FacetObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacetObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
