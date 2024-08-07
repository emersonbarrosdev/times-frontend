import { Routes } from '@angular/router';
import { DashboardComponent } from './features/components/dashboard/dashboard.component';
import { LoginComponent } from './features/components/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserCreateComponent } from './features/components/user-create/user-create.component';
import { UserListComponent } from './features/components/user-list/user-list.component';
import { UnauthorizedComponent } from './layout/unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'GERENTE', 'USER'] },
  },
  {
    path: 'user-create',
    component: UserCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'MANAGER'] },
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '' },
];
