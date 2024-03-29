import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SuccessAlertComponent } from './Components/success-alert/success-alert.component';
import { WarningComponent } from './Components/warning-alert/warning-alert.component';

@NgModule({
  declarations: [AppComponent, WarningComponent, SuccessAlertComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
