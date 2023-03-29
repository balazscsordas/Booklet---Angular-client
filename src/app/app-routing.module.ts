import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWordComponent } from './add-word/add-word.component';
import { WordDetailsComponent } from './word-details/word-details.component';
import { WordListComponent } from './word-list/word-list.component';
import { WordQuizComponent } from './word-quiz/word-quiz.component';

const routes: Routes = [
  { path: '', component: WordQuizComponent },
  { path: 'my-words/:page', component: WordListComponent },
  { path: 'add-word', component: AddWordComponent },
  { path: 'word/:id', component: WordDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
