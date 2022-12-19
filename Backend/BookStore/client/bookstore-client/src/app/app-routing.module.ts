import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './components/admin/address/address.component';
import { AuthorComponent } from './components/admin/author/author.component';
import { BookSuggestionComponent } from './components/admin/book-suggestion/book-suggestion.component';
import { BookComponent } from './components/admin/book/book.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { ContactUsComponent } from './components/admin/contact-us/contact-us.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PublisherComponent } from './components/admin/publisher/publisher.component';
import { SalesComponent } from './components/admin/sales/sales.component';
import { StaticPagesComponent } from './components/admin/static-pages/static-pages.component';
import { TranslatorComponent } from './components/admin/translator/translator.component';
import { ZonesComponent } from './components/admin/zones/zones.component';
import { HomeComponent } from './components/home/home.component';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { BookDetailsComponent } from './components/book/book-details/book-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { ProfileComponent } from './components/account/profile/profile.component';
import { ReviewsComponent } from './components/account/reviews/reviews.component';
import { FavoriteBooksComponent } from './components/account/favorite-books/favorite-books.component';
import { OrdersComponent } from './components/account/orders/orders.component';
import { InfoComponent } from './components/account/info/info.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [IsAuthenticatedGuard],
    canActivateChild: [IsAuthenticatedGuard],
    children: [
      { path: 'category', component: CategoryComponent },
      { path: 'author', component: AuthorComponent },
      { path: 'translator', component: TranslatorComponent },
      { path: 'publisher', component: PublisherComponent },
      { path: 'books', component: BookComponent },
      { path: 'zones', component: ZonesComponent },
      { path: 'addresses', component: AddressComponent },
      { path: 'static-pages', component: StaticPagesComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'contactus', component: ContactUsComponent },
      { path: 'book-suggestions', component: BookSuggestionComponent },
    ],
  },

  {
    path: 'account',
    component: ProfileComponent,
    canActivate: [IsAuthenticatedGuard],
    canActivateChild: [IsAuthenticatedGuard],
    children: [
      { path: 'reviews', component: ReviewsComponent },
      { path: 'favorite-books', component: FavoriteBooksComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'info', component: InfoComponent },
      { path: '', component: InfoComponent },
    ],
  },

  {
    path: 'books',
    component: BookListComponent,
  },
  {
    path: 'books/:id',
    component: BookDetailsComponent,
  },

  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
