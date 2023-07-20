import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/enums/address.enum';
import { Gender } from 'src/app/enums/gender.enum';
import { Nationality } from 'src/app/enums/nationality.enum';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { Rank } from 'src/app/enums/rank.enum';
import { Employee } from 'src/app/models/employees/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;

  employeeId!: number;
  employee!: Employee;
  pageMode: PageMode = PageMode.add;

  genderEnum = Gender;
  addressEnum = Address;
  nationalityEnum = Nationality;
  rankEnum = Rank;

  pageModeEnum = PageMode;

  constructor(
    private fb: FormBuilder,
    private employeeSvc: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.buildForm();

    this.getEmployeeIdFromUrl();

    if (this.pageMode == PageMode.edit) {

      this.loadEmployee();
    }
  }

  submitForm() {

    if (this.employeeForm.valid) {

      if (this.pageMode == PageMode.add) {

        this.createEmployee();
      }
      else {
        this.editEmployee();
      }
    }
  }


    //#region Private Functions

    private buildForm(): void {

      this.employeeForm = this.fb.group({
        id: [0],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        irataLevel: [],
        address: ['', Validators.required],
        salary: [],
        nationality: ['', Validators.required],
        mobileNumber: ['', Validators.required],
        rank: ['', Validators.required],  
      });
    }
  
    private getEmployeeIdFromUrl(): void {
  
      if (this.activatedRoute.snapshot.paramMap.get('id')) {
  
        this.employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.pageMode = PageMode.edit;
      }
    }
  
    private loadEmployee(): void {
  
      this.employeeSvc.getEmployeeForEdit(this.employeeId).subscribe({
        next: (employeeFromApi: Employee) => {
          this.employee = employeeFromApi;
          this.patchEmployeeForm();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.error);
        }
      });
    }
    
    private patchEmployeeForm() {
  
      this.employeeForm.patchValue({

        id: this.employee.id,
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        gender: this.employee.gender,
        dob: this.employee.dob,
        irataLevel: this.employee.irataLevel,
        address: this.employee.address,
        salary: this.employee.salary,
        nationality: this.employee.nationality,
        mobileNumber: this.employee.mobileNumber,
        rank: this.employee.rank,
      });
    }
  
    private createEmployee(): void {
  
      this.employeeSvc.createEmployee(this.employeeForm.value).subscribe({
        next: () => {
          this.snackBar.open("Employee has been created Successfully");
          this.router.navigate(['employees']);
        },
        error: (err: HttpErrorResponse) => {
          this.snackBar.open(err.message);
        }
      });
    }
  
    private editEmployee(): void {
  
      this.employeeSvc.editEmployee(this.employeeForm.value).subscribe({
        next: () => {
          this.snackBar.open("Employee has been updated Successfully");
          this.router.navigate(['employees']);
        },
        error: (err: HttpErrorResponse) => {
          this.snackBar.open(err.message);
        }
      });
    }
  
    //#endregion

}
