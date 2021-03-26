import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutes } from './auth.routing';
import { LoginComponent } from './pages';

const PAGES = [
  LoginComponent
];
@NgModule({
  imports: [
    SharedModule.forChild(),
    AuthRoutes
  ],
  declarations: [
    ...PAGES
  ]
})
export class AuthModule { }
