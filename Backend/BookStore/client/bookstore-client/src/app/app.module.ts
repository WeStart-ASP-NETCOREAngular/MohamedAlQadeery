import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/header/search-bar/search-bar.component';
import { CartComponent } from './components/header/cart/cart.component';
import { HeaderComponent } from './components/header/header/header.component';
import { MenuComponent } from './components/header/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    CartComponent,
    HeaderComponent,
    MenuComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
