import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FacetComponent } from './facet/facet.component';
import { FacetNodeComponent } from './facet/facet-node/facet-node.component';

import { MyHttpClient } from './services/my-http-client.service';
import { SearchFilterPipe } from './pipes/search-filter.pipe';


@NgModule({ 
  declarations: [
    AppComponent,
    FacetComponent,
    FacetNodeComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MyHttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
