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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    component: DashboardComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
