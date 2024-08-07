import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  static showError(
    snackBar: MatSnackBar,
    message: string,
    action: string,
    type: string
  ) {
    snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        action: action,
        panelClass: type,
      },
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  static showSuccess(
    snackBar: MatSnackBar,
    message: string,
    action: string = 'OK'
  ) {
    snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        action: action,
        panelClass: 'snackbar-success',
      },
      duration: 2000,
    });
  }

  static showInfo(
    snackBar: MatSnackBar,
    message: string,
    action: string = 'OK'
  ) {
    snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        action: action,
        panelClass: 'snackbar-info',
      },
      duration: 2000,
    });
  }

  static showWarning(
    snackBar: MatSnackBar,
    message: string,
    action: string = 'OK'
  ) {
    snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        action: action,
        panelClass: 'snackbar-warning',
      },
      duration: 2000,
    });
  }
}
