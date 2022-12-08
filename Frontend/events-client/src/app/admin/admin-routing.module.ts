import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { IsAuthentictedGuard } from '../guards/is-authenticted.guard';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { AdminCategoriesListComponent } from './components/categories/admin-categories/admin-categories-list.component';
import { AdminCategoryFormComponent } from './components/categories/admin-category-form/admin-category-form.component';
import { AdminTagFormComponent } from './components/tags/admin-tag-form/admin-tag-form.component';
import { AdminTagsComponent } from './components/tags/admin-tags/admin-tags.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminHomepageComponent,
    canActivate: [IsAuthentictedGuard, IsAdminGuard],
    children: [
      {
        path: 'categories',
        component: AdminCategoriesListComponent,
      },
      {
        path: 'categories/create',
        component: AdminCategoryFormComponent,
      },
      {
        path: 'categories/:id',
        component: AdminCategoryFormComponent,
      },
      {
        path: 'tags',
        component: AdminTagsComponent,
      },
      {
        path: 'tags/create',
        component: AdminTagFormComponent,
      },
      {
        path: 'tags/:id',
        component: AdminTagFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
