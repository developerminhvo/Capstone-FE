import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StepperComponent } from './major-suggestion-stepper/stepper/stepper.component';
// import { TestResolverService } from './_resolver/exam-resolver.service';

// const appRoutes: Routes = [
//   { path: '', redirectTo: '/recipes', pathMatch: 'full' },
//   { path: 'stepper', component: RecipesComponent, children: [
//     { path: '', component: RecipeStartComponent },
//     { path: 'new', component: RecipeEditComponent },
//     { path: ':id', component: RecipeDetailComponent },
//     { path: ':id/edit', component: RecipeEditComponent },
//   ] },
//   { path: 'shopping-list', component: ShoppingListComponent },
// ];

const appRoutes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'stepper', component: StepperComponent},
  { path: 'home', component: HomeComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)}  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
