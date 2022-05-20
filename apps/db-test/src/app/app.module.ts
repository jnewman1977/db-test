import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";

import {AppComponent} from './app.component';
import {JhaIndexedDbModule} from "@uid/indexed-db";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, CommonModule],
  providers: [JhaIndexedDbModule, {provide: 'Window', useValue: window}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
