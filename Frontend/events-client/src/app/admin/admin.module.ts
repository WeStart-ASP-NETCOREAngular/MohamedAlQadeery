import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { AdminCategoriesListComponent } from './components/categories/admin-categories/admin-categories-list.component';

@NgModule({
  declarations: [AdminHomepageComponent, AdminCategoriesListComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
