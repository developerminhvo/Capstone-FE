import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NavComponent, ContentComponent } from './components';
import { CoreRoutes } from './core.routing';
import { LayoutComponent } from './pages';

const COMPONENTS = [
  NavComponent,
  ContentComponent
];
const PAGES = [
  LayoutComponent
];

@NgModule({
  imports: [
    SharedModule.forChild(),
    CoreRoutes
  ],
  declarations: [
    ...PAGES,
    ...COMPONENTS
  ]
})
export class CoreModule { }
