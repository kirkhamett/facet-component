import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetComponent } from './facet.component';

describe('FacetComponent', () => {
  let component: FacetComponent;
  let fixture: ComponentFixture<FacetComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title after detectChanges()', () => {
    el = fixture.nativeElement.querySelector('h2');
    fixture.detectChanges();
    expect(el.textContent).toContain(component.options.title);
  });
});
