import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { FacetService } from '../services/facet.service';
import { FacetObserverService } from '../services/facet-observer.service';

interface Tree {
	root: TreeNode;
}
 
interface TreeNode {
  id ?: any;
  parent_id ?: any;
	name: string;
  isChecked ?: boolean,
	children: TreeNode[];
}

@Component({
  selector: 'app-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.css']
})

export class FacetComponent implements OnInit {

  public title : string = 'Facets';
  public facets  = [];

  public data: Tree;
	public selectedTreeNode: TreeNode | null;
  public selectedFacetIds= [];
  public selectedFacetNames = [];
  public showChild: boolean = false;
  
  
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  @ViewChildren("nodeList") nodeList: QueryList<ElementRef>;

  constructor(private facetService: FacetService, 
    private facetObserverService: FacetObserverService) { 

    this.selectedTreeNode = null;
		
    this.data = {
			root: {
				name: "first",
				children: []
			}
		}
  }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.getAll();
  }

  getAll(): void {
    this.facetService.getAll()
      .subscribe(
        data => {
          this.data = data.main;                        
        },
        error => {
          console.log(error);
        });
  }

	selectNode( node: TreeNode ) : void {
 
		this.selectedTreeNode = node;
 
		/* console.group( "Selected Tree Node" );
		console.log( "name:", node.name );
		console.log( "Children:", node?.children?.length );
		console.groupEnd(); */
 
	}

  toggleCheckbox( evt: any, node: any ) : void {    

    if(node.isChecked) {
      if (this.selectedFacetIds.indexOf(node.id) === -1) {
        // add selection to selected list
        this.selectedFacetIds.push(node.id);
        this.selectedFacetNames.push(node.name);
      }
    }
    else {
      let idKey = this.selectedFacetIds.indexOf(node.id);
      let idName = this.selectedFacetNames.indexOf(node.name);
      if (idKey > -1) {
        // remove selection from selected list
        this.selectedFacetIds.splice(idKey, 1);
        this.selectedFacetNames.splice(idName, 1);
      }
    }

    
    if (node.children?.length) {
      for (var i = 0; i < node.children.length; i++) {
        // check children/descendant checkboxes
        node.children[i].isChecked = node.isChecked;
        // add/remove descendant to selected
        this.toggleCheckbox(evt, node.children[i]);
        
      }
    }

  }

  parentCheck( evt: any, node : any ) : void {
    console.log('parentCheck');
    console.log(node.children.length);
    /* if (node.children?.length) {
      
      for (var i = 0; i < node.children.length; i++) {
        node.children[i].isChecked = node.isChecked;
      }
    } */
  }

  removeFacets() : void {
    console.log(this.selectedFacetIds);
    this.nodeList.forEach((element) => {         
      if (this.selectedFacetIds.indexOf(element.nativeElement.id) > -1) {
        console.log(element.nativeElement.id);   
        element.nativeElement.className = 'hide';
      }
    });
    this.uncheckAll();
  }

  uncheckAll() : void {
    this.selectedFacetIds = [];
    this.selectedFacetNames = [];
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
  }

  toggle( evt: any, node: any ) {
    node.isClosed = !node.isClosed;
  }

}
