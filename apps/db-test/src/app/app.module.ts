import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

import {AppComponent} from './app.component';
import {JhaIndexedDbModule} from "@uid/indexed-db";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    JhaIndexedDbModule
  ],
  providers: [
    {provide: 'DB_OPTIONS', useValue: { dbName: 'test-db' }}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
