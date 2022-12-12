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
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
    HomeComponent,
    DashboardComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
