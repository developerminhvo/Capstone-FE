// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
// import { Actions, ofType } from "@ngrx/effects";
// import { Store } from "@ngrx/store";
// import { map, switchMap, take } from "rxjs/operators";
// import { Test } from "../_models/test";
// import * as fromApp from "../_store/app.reducer";
// import * as StepperActions from "../major-suggestion-stepper/stepper/store/stepper.actions";

// @Injectable({ providedIn: "root" })
// export class TestResolverService implements Resolve<Test> {
//   constructor(
//     private store: Store<fromApp.AppState>,
//     private actions$: Actions
//   ) {}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     // return this.dataStorageService.fetchRecipes();
//     console.log("Route data:", ); 
//     return this.store.select("stepper").pipe(
//       take(1),
//       map((recipesState) => {
//         return recipesState.recipes;
//       }),
//       switchMap((stepperState) => {
//         this.store.dispatch(new StepperActions.LoadTest(route.params['id']));
//           return this.actions$.pipe(
//             ofType(StepperActions.SET_TEST),
//             take(1)
//           );
//         return stepperState.test;
//       })
//     );
//   }
// }
