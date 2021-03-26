import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardMainComponent } from './pages';
import { SharedModule } from 'src/app/admin/shared/shared.module';

const PAGES = [
  DashboardMainComponent
];
@NgModule({
  imports: [
    SharedModule.forChild(),
    DashboardRoutes
  ],
  declarations: [...PAGES]
})
export class DashboardModule { }
