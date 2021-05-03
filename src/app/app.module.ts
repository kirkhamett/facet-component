import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FacetComponent } from './facet/facet.component';

import { MyHttpClient } from './services/my-http-client.service';

@NgModule({ 
  declarations: [
    AppComponent,
    FacetComponent
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
