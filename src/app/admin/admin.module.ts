import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import { SharedModule } from './shared/shared.module';



@NgModule({
  imports: [
    SharedModule.forRoot(),    
    // SharedModule.forChild(),    
    AdminRoutes
  ],
  declarations: [AdminComponent],  
})
export class AdminModule { }
