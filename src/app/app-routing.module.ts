import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWordComponent } from './components/add-word/add-word.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { WordDetailsComponent } from './components/word-details/word-details.component';
import { WordListComponent } from './components/word-list/word-list.component';
import { WordQuizComponent } from './components/word-quiz/word-quiz.component';

const routes: Routes = [
  { path: '', component: WordQuizComponent },
  { path: 'my-words/:page', component: WordListComponent },
  { path: 'add-word', component: AddWordComponent },
  { path: 'word/:id', component: WordDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
//
