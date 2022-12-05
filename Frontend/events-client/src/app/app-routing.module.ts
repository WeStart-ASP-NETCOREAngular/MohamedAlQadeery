import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
