import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-create-word-list-dialog',
  templateUrl: './create-word-list-dialog.component.html',
})
export class CreateWordListDialogComponent {
  constructor(private dialogRef: MatDialogRef<CreateWordListDialogComponent>, private snackbar: SnackbarService) {}

  newWordListForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  submitNewWordListForm() {
    if (this.newWordListForm.valid) {
      this.dialogRef.close(this.newWordListForm.value);
    } else {
      this.snackbar.error('Please fill out the required field.');
    }
  }
}
