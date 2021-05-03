import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FacetObserverService {

  selectedFacet = new Subject<{}>();

  facetsToRemove = new Subject<{}>();
  
  constructor() { }
}
