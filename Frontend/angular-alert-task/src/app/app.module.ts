import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SuccessAlert } from './Components/success-alert/success-alert.component';
import { WarningComponent } from './Components/warning-alert/warning-alert.component';

@NgModule({
  declarations: [AppComponent, WarningComponent, SuccessAlert],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
