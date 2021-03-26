import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, NavigateComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'navigate', component: NavigateComponent}
];

export const AuthRoutes = RouterModule.forChild(routes);
