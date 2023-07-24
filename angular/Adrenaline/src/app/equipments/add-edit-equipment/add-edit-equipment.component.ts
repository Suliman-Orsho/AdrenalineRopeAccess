import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { Equipment } from 'src/app/models/equipments/equipment.model';
import { Lookup } from 'src/app/models/lookups/lookup.model';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-edit-equipment',
  templateUrl: './add-edit-equipment.component.html',
  styleUrls: ['./add-edit-equipment.component.css']
})
export class AddEditEquipmentComponent implements OnInit {

  equipmentForm!: FormGroup;
  projectLookup: Lookup[] = [];

  equipmentId!: number;
  equipment!: Equipment;
  
  pageMode: PageMode = PageMode.add;

  pageModeEnum = PageMode;

  constructor(
    private fb: FormBuilder,
    private equipmentSvc: EquipmentService,
    private projectSvc: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.buildForm();

    this.loadProjects();

    this.getEquipmentIdFromUrl();

    if (this.pageMode == PageMode.edit) {

      this.loadEquipment();
    }

  }
  
  submitForm() {

    if (this.equipmentForm.valid) {

      if (this.pageMode == PageMode.add) {

        this.createEquipment();
      }
      else {
        this.editEquipment();
      }
    }
  }

  //#region Private Functions

  private buildForm(): void {

    this.equipmentForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      entryDate: ['', Validators.required],
      projectId: []
    });
  }

  private loadProjects() {

    this.projectSvc.getProjectsLookup().subscribe({
      next: (projectFromApi: Lookup[]) => {
        this.projectLookup = projectFromApi;
      }
    });
  }

  private getEquipmentIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.equipmentId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.edit;
    }
  }

  private loadEquipment(): void {

    this.equipmentSvc.getEquipmentForEdit(this.equipmentId).subscribe({
      next: (equipmentFromApi: Equipment) => {
        this.equipment = equipmentFromApi;
        this.patchEquipmentForm();
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  private patchEquipmentForm() {

    this.equipmentForm.patchValue({
      id: this.equipment.id,
      name: this.equipment.name,
      entryDate: this.equipment.entryDate,
      projectId: this.equipment.projectId
    });
  }

  private createEquipment(): void {

    this.equipmentSvc.createEquipment(this.equipmentForm.value).subscribe({
      next: (equipmentFromApi: Equipment) => {
        this.snackBar.open("Equipment has been created Successfully");
        this.router.navigate(['equipments']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  private editEquipment(): void {

    this.equipmentSvc.editEquipment(this.equipmentForm.value).subscribe({
      next: () => {
        this.snackBar.open("Equipment has been updated Successfully");
        this.router.navigate(['equipments']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  //#endregion

}