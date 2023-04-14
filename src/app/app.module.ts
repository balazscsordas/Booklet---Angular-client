import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WordQuizComponent } from './components/word-quiz/word-quiz.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WordListComponent } from './components/word-list/word-list.component';
import { AddWordComponent } from './components/add-word/add-word.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { WordDetailsComponent } from './components/word-details/word-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { LayoutComponent } from './components/layout/layout.component';
import { WordQuizSettingsComponent } from './components/word-quiz-settings/word-quiz-settings.component';
import { InputFieldErrorTextComponent } from './components/input-field-error-text/input-field-error-text.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { CreateNewProfileComponent } from './components/create-new-profile/create-new-profile.component';
import { ChooseProfileComponent } from './components/choose-profile/choose-profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { ForgottenPasswordInputComponent } from './components/forgotten-password/forgotten-password-input/forgotten-password-input.component';
import { NewPasswordComponent } from './components/forgotten-password/new-password/new-password.component';
import { TranslatorComponent } from './components/translator/translator.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    WordQuizComponent,
    NavbarComponent,
    WordListComponent,
    AddWordComponent,
    WordDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    LayoutComponent,
    InputFieldErrorTextComponent,
    WordQuizSettingsComponent,
    DeleteDialogComponent,
    CreateNewProfileComponent,
    ChooseProfileComponent,
    ForgottenPasswordInputComponent,
    NewPasswordComponent,
    TranslatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatMenuModule,
    MatTabsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
