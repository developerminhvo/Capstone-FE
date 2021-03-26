import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'core', pathMatch: 'full' },
  { path: 'core', loadChildren: () => import('src/app/admin/modules').then((m) => m.CoreModule) },
  { path: 'auth', loadChildren: () => import('src/app/admin/modules').then((m) => m.AuthModule) },
];

export const AdminRoutes = RouterModule.forChild(routes);
