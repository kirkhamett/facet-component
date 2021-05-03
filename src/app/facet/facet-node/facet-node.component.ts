import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { FacetObserverService } from '../../services/facet-observer.service';

@Component({
  selector: 'app-facet-node',
  templateUrl: './facet-node.component.html',
  styleUrls: ['./facet-node.component.css']
})
export class FacetNodeComponent implements OnInit {

  @Input() nodes: any;
  @Input() show: boolean = false;  
  @ViewChild(FacetNodeComponent) child: FacetNodeComponent;

  isChecked : boolean = false;
  parentChecked: boolean = false;
  
  constructor(private facetObserverService : FacetObserverService) { 

  }

  ngOnInit(): void {
    this.facetObserverService.facetsToRemove.subscribe((msg: any) => {
      if (msg.ids) {
        for (var i of msg.ids) {
          
        }
      }
    })
  }


  toggleChildren(event: any, node: any) : void {
      this.show = !this.show;
      console.log('click');
  }

  selectFacet(evt: any, node: any) : void {
    if (this.child) {
      this.child.isChecked = true;
    }
    if (evt.target.checked) {
      this.isChecked = true;
      this.facetObserverService.selectedFacet.next({ id : node.id, name : node.name, action : 'add' });
    }
    else {
      this.facetObserverService.selectedFacet.next({ id : node.id, name : node.name, action : 'remove' });
    }
  }

  
}
