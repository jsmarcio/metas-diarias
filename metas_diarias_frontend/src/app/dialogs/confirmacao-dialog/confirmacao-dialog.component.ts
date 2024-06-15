import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppService } from '../../app.service';
import { MetaUpdate } from '../../types/metaUpdate';

@Component({
  selector: 'app-confirmacao-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './confirmacao-dialog.component.html',
  styleUrl: './confirmacao-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmacaoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MetaUpdate,
    private service: AppService,
    private _snackBar: MatSnackBar
  ) {}

  onDelete(meta: MetaUpdate) {
    let metaDiaria = meta;
    this.service.deletaMeta(metaDiaria.id).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Response: ', response);
        this.openSnackBarSuccess(
          'Meta ' + metaDiaria.metaDiaria + ' excluída com sucesso!',
        );
        this.onClose();
        return;
      },
      error: (error: HttpErrorResponse) => {
        this.openSnackBarError('Erro ao excluir meta ' + meta.metaDiaria);
        console.log('Erro ao excluir meta: ', error);
      },
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  openSnackBarSuccess(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: 'app-notification-success',
    });
  }

  openSnackBarError(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: 'app-notification-error',
    });
  }
}
