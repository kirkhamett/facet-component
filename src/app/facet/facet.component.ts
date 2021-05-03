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
  isVisible ?: boolean,
  isClosed ?: boolean,
	children: TreeNode[];
}

@Component({
  selector: 'app-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.css']
})

export class FacetComponent implements OnInit {

  /**
   * component settings
   */
  public options = { 
    title: 'Facets',
    btnResetText: 'Refresh',
    btnDeleteText: 'Delete',
    btnClearText: 'Clear',
    searchLabel: 'Search',
    searchPlaceholder: 'E.g. Riemen'
  };
  
  /**
   * main data object
   */
  public data: Tree;

  /**
   * array to collect ids of selected categories
   */
	public selectedFacetIds = [];

  /**
   * array to collect names of selected categories 
   */
  public selectedFacetNames = [];

  /**
   * array to collect names of selected categories 
   */
  public searchText: string = '';
  
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  @ViewChildren("nodeList") nodeList: QueryList<ElementRef>;

  /**
   * class constructor
   */
  constructor(private facetService: FacetService, 
    private facetObserverService: FacetObserverService) { 

    // set default
    this.data = {
      root: {
        name: "first",
        children: []
      }
    }
  }

  /**
   * on init, call refresh list to fetch data from server 
   * @return void
   */
  ngOnInit() : void {
    this.refreshList();
  }

  /**
   * this makes the actual call to the backend
   * * @return void
   */
  refreshList() : void {
    this.facetService.getAll()
      .subscribe(
        data => {
          this.data = data.main;  
          this.options = data.options;                      
        },
        error => {
          //console.log(error);
        });
  }

  /**
   * toggle the current checkbox and all descendants
   * note: another way to do this is to traverse the main list -> this.data
   * this implementation was done to present another way of doing this action
   * @param evt : any
   * @param node: TreeNode
   * @return void
   */
  toggleCheckbox( evt: any, node: TreeNode ) : void {    
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

    // check children 
    if (node.children?.length) {
      for (var i = 0; i < node.children.length; i++) {
        // check children/descendant checkboxes
        node.children[i].isChecked = node.isChecked;
        // add/remove descendant to selected
        this.toggleCheckbox(evt, node.children[i]);        
      }
    }
  }

  /**
   * 'remove selected' button action
   * soft removes the selected (checked) items from the tree
   * note: another way to do this is to traverse the main list -> this.data
   * this implementation was done to present another way of doing this action
   * @todo loop the list instead of the elements
   * @return void
   */
  removeFacets() : void {
    this.nodeList.forEach((element) => {         
      if (this.selectedFacetIds.indexOf(element.nativeElement.id) > -1) {
        // hide (soft delete)
        element.nativeElement.className = 'hide';
      }
    });
    this.uncheckAll();
  }

  /**
   * reset all visible/remaining items in the list 
   * this is called after delete action
   * @return void
   */
  uncheckAll() : void {
    this.selectedFacetIds = [];
    this.selectedFacetNames = [];
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
  }

  /**
   * toggles (show/hide) child node from view
   * @return void
   */
  toggle( evt: any, node: any ) {
    node.isClosed = !node.isClosed;
  }

  /**
   * search as you type filter
   * @return void
   */
  doSearch()  : void {    
    this.searchFilter(this.data.root);      
  }

  /**
   * actual search filter and traverses through the whole tree
   * note: most (if not all) actions involving tree manipulation should 
   * traverse this.data to maximize 2-way binding
   * 
   * @param kw: string
   * @param node: TreeNode
   * @return void 
   */
  searchFilter( node: TreeNode) : void {    
    let needle = this.searchText.toLowerCase();
    let haystack = node.name.toLowerCase();
    
    if (haystack.indexOf(needle) === -1) {
      node.isVisible = false;      
    } 
    else {
      node.isVisible = true;      
    }

    if (node?.children?.length) {
      node.children.forEach((child) => { 
        this.searchFilter(child);
      });        
    }
  }

}
