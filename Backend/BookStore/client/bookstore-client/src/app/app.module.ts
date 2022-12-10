import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/header/search-bar/search-bar.component';
import { CartComponent } from './components/header/cart/cart.component';
import { HeaderComponent } from './components/header/header/header.component';
import { MenuComponent } from './components/header/menu/menu.component';
import { HeroComponent } from './components/hero/hero.component';
import { BookAdsComponent } from './components/book/book-ads/book-ads.component';
import { BooksPopularComponent } from './components/book/books-popular/books-popular.component';
import { BooksRowComponent } from './components/Shared/books-row/books-row.component';
import { PublishersRowComponent } from './components/Shared/publishers-row/publishers-row.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    CartComponent,
    HeaderComponent,
    MenuComponent,
    HeroComponent,
    BookAdsComponent,
    BooksPopularComponent,
    BooksRowComponent,
    PublishersRowComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
