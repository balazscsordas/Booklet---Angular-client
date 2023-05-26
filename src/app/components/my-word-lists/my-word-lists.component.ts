import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateWordListDialogComponent } from '../dialogs/create-word-list-dialog/create-word-list-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MyWordListsService } from './service/my-word-lists.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

export interface IWordList {
  id: number;
  name: string;
  profile_id: number;
}

@Component({
  selector: 'app-my-word-lists',
  templateUrl: './my-word-lists.component.html',
})
export class MyWordListsComponent {
  constructor(private myWordListsService: MyWordListsService, private dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: Router, private snackbar: SnackbarService) {}

  wordLists: IWordList[] = this.activatedRoute.snapshot.data['wordLists'];

  openCreateWordListDialog(): void {
    const dialogRef = this.dialog.open(CreateWordListDialogComponent);

    dialogRef.afterClosed().subscribe(newWordListForm => {
      if (newWordListForm) {
        this.myWordListsService.postWordList(newWordListForm).subscribe(newWordList => {
          this.snackbar.success('Successfully created a new list.');
          this.wordLists.push(newWordList);
        });
      }
    });
  }

  chooseList(id: number) {
    this.router.navigateByUrl(`/my-lists/${id}/1`);
  }
}
