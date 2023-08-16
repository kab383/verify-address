import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

import { AppComponent } from './app.component';
import { VerifyAddressComponent } from './address/verify-address/verify-address.component';

@NgModule({
  declarations: [
    AppComponent,
    VerifyAddressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
