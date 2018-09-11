import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DOCUMENT } from './app.component';
import { WINDOW_PROVIDERS } from '@app/core/services/window.service';



export function _document(): any {
  return document;
}

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,
       // features
    StaticModule,
    SettingsModule,
    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    WINDOW_PROVIDERS,
    { provide: DOCUMENT, useFactory: _document, deps: [] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
