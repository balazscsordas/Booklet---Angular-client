import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordDetailsComponent } from './components/word-details/word-details.component';
import { WordListComponent } from './components/word-list/word-list.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { WordQuizGuard } from './guards/word-quiz/word-quiz.guard';
import { ProfileGuard } from './guards/profile/profile.guard';
import { WordDetailsResolver } from './components/word-details/resolver/word-details.resolver';
import { WordListResolver } from './components/word-list/resolver/word-list.resolver';
import { MyWordListsComponent } from './components/my-word-lists/my-word-lists.component';
import { MyWordListsResolver } from './components/my-word-lists/resolver/my-word-lists.resolver';
import { TranslatorComponent } from './components/translator/translator.component';
import { ChooseProfileComponent } from './components/auth/choose-profile/choose-profile.component';
import { ChooseProfileResolver } from './components/auth/choose-profile/resolver/choose-profile.resolver';
import { CreateNewProfileComponent } from './components/auth/create-new-profile/create-new-profile.component';
import { ForgottenPasswordInputComponent } from './components/auth/forgotten-password/forgotten-password-input/forgotten-password-input.component';
import { NewPasswordComponent } from './components/auth/forgotten-password/new-password/new-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { LayoutComponent } from './components/layout/layout-comp/layout.component';
import { NotFoundPageComponent } from './components/layout/not-found-page/not-found-page.component';
import { WordQuizSettingsResolver } from './components/quiz/word-quiz-settings/resolver/word-quiz-settings.resolver';
import { WordQuizSettingsComponent } from './components/quiz/word-quiz-settings/word-quiz-settings.component';
import { WordQuizResolver } from './components/quiz/word-quiz/resolver/word-quiz.resolver';
import { WordQuizComponent } from './components/quiz/word-quiz/word-quiz.component';

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
        path: 'my-lists',
        component: MyWordListsComponent,
        canActivate: [AuthGuard, ProfileGuard],
        resolve: { wordLists: MyWordListsResolver },
      },
      {
        path: 'my-lists/:wordListId/:page',
        component: WordListComponent,
        canActivate: [AuthGuard, ProfileGuard],
        resolve: { words: WordListResolver },
      },
      {
        path: 'translator',
        component: TranslatorComponent,
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
