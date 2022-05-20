import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NxWelcomeComponent} from './nx-welcome.component';
import {JhaIndexedDbModule} from "@uid/indexed-db";

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent
  ],
  imports: [BrowserModule],
  providers: [JhaIndexedDbModule],
  bootstrap: [AppComponent],
})
export class AppModule {
}
