import { Routes, RouterModule } from '@angular/router';
import { DashboardMainComponent } from './pages';

const routes: Routes = [
  {
    path: '', component: DashboardMainComponent
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
