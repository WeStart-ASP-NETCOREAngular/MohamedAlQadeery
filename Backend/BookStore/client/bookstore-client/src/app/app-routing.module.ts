import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './components/admin/address/address.component';
import { AuthorComponent } from './components/admin/author/author.component';
import { BookComponent } from './components/admin/book/book.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PublisherComponent } from './components/admin/publisher/publisher.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
