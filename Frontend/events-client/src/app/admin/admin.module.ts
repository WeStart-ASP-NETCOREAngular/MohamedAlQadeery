import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { AdminCategoriesListComponent } from './components/categories/admin-categories/admin-categories-list.component';
import { AdminCategoryFormComponent } from './components/categories/admin-category-form/admin-category-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminHomepageComponent,
    AdminCategoriesListComponent,
    AdminCategoryFormComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
