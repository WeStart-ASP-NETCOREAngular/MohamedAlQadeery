import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { AdminHomepageComponent } from './components/admin/admin-homepage/admin-homepage.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsAuthentictedGuard } from './guards/is-authenticted.guard';
import { IsGuestGuard } from './guards/is-guest.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [IsGuestGuard] },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [IsGuestGuard],
      },
    ],
  },
  {
    path: 'admin',
    component: AdminHomepageComponent,
    canActivate: [IsAuthentictedGuard, IsAdminGuard],
    children: [{ path: 'categories', component: AdminCategoriesComponent }],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
