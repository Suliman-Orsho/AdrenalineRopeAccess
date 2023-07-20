import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdvanceList } from '../models/advances/advanceList.model';
import { AdvanceService } from '../services/advance.service';
import { DeleteAdvanceComponent } from './delete-advance/delete-advance.component';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.css']
})
export class AdvanceComponent implements OnInit {

  advanceDS: AdvanceList[] = [];
  advanceColumns: string[] = ['employeeFullName', 'amount', 'advanceDate', 'actions'];

  constructor(
    private advanceSvc: AdvanceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
     ) {}

  ngOnInit(): void {

    this.loadAdvances();
  }

  openDeleteDialog(advance: AdvanceList) {

    const dialogRef = this.dialog.open(DeleteAdvanceComponent, {
      data: advance
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {

        if (result) {
          this.advanceSvc.deleteAdvance(advance.id).subscribe({
            next: () => {
              this.loadAdvances();
              this.snackBar.open(`Advance #${advance.id} has been deleted successfully`);
            },
            error: (err: HttpErrorResponse) => {
              this.snackBar.open(`Advance #${advance.id} cannot be deleted. ${err.message}`);
            }
          });
        }

      }
    });
  }

  //#region Private Functions

  private loadAdvances(): void {

    this.advanceSvc.getAdvances().subscribe({
      next: (advancesFromApi: AdvanceList[]) => {
        this.advanceDS = advancesFromApi;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
      }
    });
  }
  //#endregion



}