import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipmentList } from '../models/equipments/equipmentList.model';
import { Project } from '../models/projects/project.model';
import { ProjectList } from '../models/projects/projectList.model';
import { EquipmentService } from '../services/equipment.service';
import { DeleteEquipmentComponent } from './delete-equipment/delete-equipment.component';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  equipmentDS: EquipmentList[] = [];
  equipmentColumns: string[] = ['name', 'projectName', 'entryDate', 'actions' ];


  constructor(
    private equipmentSvc: EquipmentService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
     ) {}

  ngOnInit(): void {

    this.loadEquipments();
  }

  openDeleteDialog(equipment: EquipmentList) {

    const dialogRef = this.dialog.open(DeleteEquipmentComponent, {
      data: equipment
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {

        if (result) {
          this.equipmentSvc.deleteEquipment(equipment.id).subscribe({
            next: () => {
              this.loadEquipments();
              this.snackBar.open(`Equipment #${equipment.id} has been deleted successfully`);
            },
            error: (err: HttpErrorResponse) => {
              this.snackBar.open(`Equipment #${equipment.id} cannot be deleted. ${err.message}`);
            }
          });
        }

      }
    });
  }

  //#region Private Functions

  private loadEquipments(): void {

    this.equipmentSvc.getEquipments().subscribe({
      next: (equipmentsFromApi: EquipmentList[]) => {
        this.equipmentDS = equipmentsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
      }
    });
  }

  //#endregion
}
