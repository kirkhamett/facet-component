import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetNodeComponent } from './facet-node.component';

describe('FacetNodeComponent', () => {
  let component: FacetNodeComponent;
  let fixture: ComponentFixture<FacetNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacetNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
