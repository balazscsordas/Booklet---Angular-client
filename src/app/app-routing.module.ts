import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWordComponent } from './components/add-word/add-word.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { WordDetailsComponent } from './components/word-details/word-details.component';
import { WordListComponent } from './components/word-list/word-list.component';
import { WordQuizComponent } from './components/word-quiz/word-quiz.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { WordQuizSettingsComponent } from './components/word-quiz-settings/word-quiz-settings.component';
import { WordQuizGuard } from './guards/word-quiz/word-quiz.guard';
import { CreateNewProfileComponent } from './components/create-new-profile/create-new-profile.component';
import { ChooseProfileComponent } from './components/choose-profile/choose-profile.component';
import { ProfileGuard } from './guards/profile/profile.guard';
import { ForgottenPasswordInputComponent } from './components/forgotten-password/forgotten-password-input/forgotten-password-input.component';
import { NewPasswordComponent } from './components/forgotten-password/new-password/new-password.component';
import { ChooseProfileResolver } from './components/choose-profile/resolver/choose-profile.resolver';
import { WordQuizSettingsResolver } from './components/word-quiz-settings/resolver/word-quiz-settings.resolver';
import { WordDetailsResolver } from './components/word-details/resolver/word-details.resolver';
import { WordQuizResolver } from './components/word-quiz/resolver/word-quiz.resolver';
import { WordListResolver } from './components/word-list/resolver/word-list.resolver';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard, ProfileGuard],
    children: [
      {
        path: '',
        component: WordQuizSettingsComponent,
        canActivate: [AuthGuard, ProfileGuard],
        resolve: { languageOptions: WordQuizSettingsResolver },
      },
      {
        path: 'practice',
        component: WordQuizComponent,
        canActivate: [AuthGuard, ProfileGuard, WordQuizGuard],
        resolve: { word: WordQuizResolver },
      },
      {
        path: 'my-words/:page',
        component: WordListComponent,
        canActivate: [AuthGuard, ProfileGuard],
        resolve: { words: WordListResolver },
      },
      {
        path: 'add-word',
        component: AddWordComponent,
        canActivate: [AuthGuard, ProfileGuard],
      },
      {
        path: 'word/:id',
        component: WordDetailsComponent,
        canActivate: [AuthGuard, ProfileGuard],
        resolve: { word: WordDetailsResolver },
      },
    ],
  },
  {
    path: 'create-profile',
    component: CreateNewProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'choose-profile',
    component: ChooseProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      profiles: ChooseProfileResolver,
    },
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgotten-password', component: ForgottenPasswordInputComponent },

  { path: 'set-new-password/:token', component: NewPasswordComponent },
  { path: '**', component: NotFoundPageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
