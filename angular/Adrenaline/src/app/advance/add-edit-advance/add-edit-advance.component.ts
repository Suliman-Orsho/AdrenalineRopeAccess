import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { Advance } from 'src/app/models/advances/advance.model';
import { Lookup } from 'src/app/models/lookups/lookup.model';
import { AdvanceService } from 'src/app/services/advance.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-edit-advance',
  templateUrl: './add-edit-advance.component.html',
  styleUrls: ['./add-edit-advance.component.css']
})
export class AddEditAdvanceComponent implements OnInit {

  advanceForm!: FormGroup;
  employeeLookup: Lookup[] = [];

  advanceId!: number;
  advance!: Advance;
  pageMode: PageMode = PageMode.add;

  pageModeEnum = PageMode;

  constructor(
    private fb: FormBuilder,
    private advanceSvc: AdvanceService,
    private employeeSvc: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.buildForm();

    this.loadEmployees();

    this.getAdvanceIdFromUrl();

    if (this.pageMode == PageMode.edit) {

      this.loadAdvance();
    }

  }
  
  submitForm() {

    if (this.advanceForm.valid) {

      if (this.pageMode == PageMode.add) {

        this.createAdvance();
      }
      else {
        this.editAdvance();
      }
    }
  }

  //#region Private Functions

  private buildForm(): void {

    this.advanceForm = this.fb.group({
      id: [0],
      employeeId: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  private loadEmployees() {

    this.employeeSvc.getEmployeesLookup().subscribe({
      next: (employeeFromApi: Lookup[]) => {
        this.employeeLookup = employeeFromApi;
      }
    });
  }

  private getAdvanceIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.advanceId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.edit;
    }
  }

  private loadAdvance(): void {

    this.advanceSvc.getAdvanceForEdit(this.advanceId).subscribe({
      next: (advanceFromApi: Advance) => {
        this.advance = advanceFromApi;
        this.patchAdvanceForm();
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  private patchAdvanceForm() {

    this.advanceForm.patchValue({
      id: this.advance.id,
      employeeId: this.advance.employeeId,
      amount: this.advance.amount
    });
  }

  private createAdvance(): void {

    this.advanceSvc.createAdvance(this.advanceForm.value).subscribe({
      next: (advanceFromApi: Advance) => {
        this.snackBar.open("Advance has been created Successfully");
        this.router.navigate(['advances']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  private editAdvance(): void {

    this.advanceSvc.editAdvance(this.advanceForm.value).subscribe({
      next: () => {
        this.snackBar.open("Advance has been updated Successfully");
        this.router.navigate(['advances']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  //#endregion

}
