import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WordListComponent } from './components/word-list/word-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { WordDetailsComponent } from './components/word-details/word-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { InputFieldErrorTextComponent } from './components/input-field-error-text/input-field-error-text.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { TranslatorComponent } from './components/translator/translator.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MyWordListsComponent } from './components/my-word-lists/my-word-lists.component';
import { CreateWordListDialogComponent } from './components/dialogs/create-word-list-dialog/create-word-list-dialog.component';
import { AddWordDialogComponent } from './components/dialogs/add-word-dialog/add-word-dialog.component';
import { ChooseProfileComponent } from './components/auth/choose-profile/choose-profile.component';
import { CreateNewProfileComponent } from './components/auth/create-new-profile/create-new-profile.component';
import { ForgottenPasswordInputComponent } from './components/auth/forgotten-password/forgotten-password-input/forgotten-password-input.component';
import { NewPasswordComponent } from './components/auth/forgotten-password/new-password/new-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { LayoutComponent } from './components/layout/layout-comp/layout.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { NotFoundPageComponent } from './components/layout/not-found-page/not-found-page.component';
import { WordQuizSettingsComponent } from './components/quiz/word-quiz-settings/word-quiz-settings.component';
import { WordQuizComponent } from './components/quiz/word-quiz/word-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    WordQuizComponent,
    NavbarComponent,
    WordListComponent,
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
    NotFoundPageComponent,
    MyWordListsComponent,
    CreateWordListDialogComponent,
    AddWordDialogComponent,
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
