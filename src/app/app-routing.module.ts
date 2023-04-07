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

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: WordQuizSettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'practice',
        component: WordQuizComponent,
        canActivate: [AuthGuard, WordQuizGuard],
      },
      {
        path: 'my-words/:page',
        component: WordListComponent,
        canActivate: [AuthGuard],
        data: { optionalQueryParams: ['filter'] },
      },
      {
        path: 'add-word',
        component: AddWordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'word/:id',
        component: WordDetailsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
