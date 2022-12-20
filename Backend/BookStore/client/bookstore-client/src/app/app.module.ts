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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthorComponent } from './components/admin/author/author.component';
import { TranslatorComponent } from './components/admin/translator/translator.component';
import { PublisherComponent } from './components/admin/publisher/publisher.component';
import { InputComponent } from './components/Shared/input/input.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookComponent } from './components/admin/book/book.component';
import { SelectInputComponent } from './components/Shared/select-input/select-input.component';
import { ZonesComponent } from './components/admin/zones/zones.component';
import { AddressComponent } from './components/admin/address/address.component';
import { StaticPagesComponent } from './components/admin/static-pages/static-pages.component';
import { SalesComponent } from './components/admin/sales/sales.component';
import { ContactUsComponent } from './components/admin/contact-us/contact-us.component';
import { BookSuggestionComponent } from './components/admin/book-suggestion/book-suggestion.component';
import { TextAreaComponent } from './components/Shared/text-area/text-area.component';
import { BookDetailsComponent } from './components/book/book-details/book-details.component';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { OrdersComponent } from './components/account/orders/orders.component';
import { ReviewsComponent } from './components/account/reviews/reviews.component';
import { FavoriteBooksComponent } from './components/account/favorite-books/favorite-books.component';
import { InfoComponent } from './components/account/info/info.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { BookReviewsComponent } from './components/book/book-reviews/book-reviews.component';
import { CartContentComponent } from './components/header/cart-content/cart-content.component';
import { PublisherListComponent } from './components/publisher-list/publisher-list.component';
import { StaticPageComponent } from './components/static-page/static-page.component';

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
    AuthorComponent,
    TranslatorComponent,
    PublisherComponent,
    InputComponent,
    BookComponent,
    SelectInputComponent,
    ZonesComponent,
    AddressComponent,
    StaticPagesComponent,
    SalesComponent,
    ContactUsComponent,
    BookSuggestionComponent,
    TextAreaComponent,
    BookDetailsComponent,
    BookListComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    OrdersComponent,
    ReviewsComponent,
    FavoriteBooksComponent,
    InfoComponent,
    BookReviewsComponent,
    CartContentComponent,
    PublisherListComponent,
    StaticPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
      progressBar: true,
      progressAnimation: 'increasing',
    }), // ToastrModule added
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
