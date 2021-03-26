import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepperComponent } from './major-suggestion-stepper/stepper/stepper.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromApp from './_store/app.reducer';
import { StepperEffects } from './major-suggestion-stepper/stepper/store/stepper.effects';
import { environment } from 'src/environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { ExamPageComponent } from './major-suggestion-stepper/exam-page/exam-page.component';
import { WaitingComponent } from './_sharings/components/waiting/waiting.component';
import { AnswerComponent } from './major-suggestion-stepper/exam-page/answer/answer.component';
import { ResultDialogComponent } from './major-suggestion-stepper/exam-page/result-dialog/result-dialog.component';
import { CountdownModule } from 'ngx-countdown';
import { TestCardComponent } from './major-suggestion-stepper/exam-page/test-card/test-card.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SafeHtmlPipe } from './_helper/safe-html-pipe';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';



import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import vi from '@angular/common/locales/vi';
import { SharedModule } from './admin/shared/shared.module';


registerLocaleData(vi);
@NgModule({
  declarations: [					
    AppComponent,
    StepperComponent,
    ExamPageComponent,
    WaitingComponent,
    AnswerComponent,
    ResultDialogComponent,
    TestCardComponent,
    HeaderComponent,
    HomeComponent,
    SafeHtmlPipe,
    AuthenticationComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,        
    FlexLayoutModule,           
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([StepperEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    
    AppRoutingModule,
    CountdownModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,


    MatAutocompleteModule,
    MatStepperModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatRadioModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,  
    MatSelectModule,
    MatListModule,

    FormsModule,
    ReactiveFormsModule,
    CommonModule,  

    // SharedModule.forRoot()
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
