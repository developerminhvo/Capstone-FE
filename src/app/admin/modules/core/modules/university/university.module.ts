import { NgModule } from '@angular/core';
import { UniversityRoutes } from './university.routing';
import { UniversityDetailComponent, UniversityMainComponent } from './pages';
import { CreateMajorModalComponent, CreateUniversityModalComponent } from './components/modals';
import { SharedModule } from 'src/app/admin/shared/shared.module';

const COMPONENTS = [
  CreateUniversityModalComponent,
  CreateMajorModalComponent
];

const PAGES = [
  UniversityMainComponent,
  UniversityDetailComponent
]
@NgModule({
  imports: [
    SharedModule.forChild(),
    UniversityRoutes
  ],
  declarations: [...PAGES, ...COMPONENTS]
})
export class UniversityModule { }
