import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { AdminCategoriesListComponent } from './components/categories/admin-categories/admin-categories-list.component';
import { AdminCategoryFormComponent } from './components/categories/admin-category-form/admin-category-form.component';
import { SharedModule } from '../shared/shared.module';
import { AdminTagsComponent } from './components/tags/admin-tags/admin-tags.component';
import { AdminTagFormComponent } from './components/tags/admin-tag-form/admin-tag-form.component';

@NgModule({
  declarations: [
    AdminHomepageComponent,
    AdminCategoriesListComponent,
    AdminCategoryFormComponent,
    AdminTagsComponent,
    AdminTagFormComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
