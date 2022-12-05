import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { IsAuthentictedGuard } from '../guards/is-authenticted.guard';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { AdminCategoriesListComponent } from './components/categories/admin-categories/admin-categories-list.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminHomepageComponent,
    canActivate: [IsAuthentictedGuard, IsAdminGuard],
    children: [{ path: 'categories', component: AdminCategoriesListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
