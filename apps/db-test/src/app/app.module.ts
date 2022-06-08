import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

import {AppComponent} from './app.component';
import {AppDB} from "@uid/indexed-db";
import Dexie from "dexie";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    {provide: AppDB, useValue: new AppDB({ dbName: 'test-db' })}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
