import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Gender } from '../enums/gender.enum';
import { Rank } from '../enums/rank.enum';
import { EmployeeList } from '../models/employees/employeeList.model';
import { EmployeeService } from '../services/employee.service';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeDS: EmployeeList[] = [];
  employeeColumns: string[] = ['fullName', 'gender', 'age', 'rank', 'mobileNumber', 'salary', 'actions' ];

  gender = Gender;
  rank = Rank;

  constructor(
    private employeeSvc: EmployeeService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
     ) {}

  ngOnInit(): void {

    this.loadEmployees();
  }

  openDeleteDialog(employee: EmployeeList) {

    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: employee
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {

        if (result) {
          this.employeeSvc.deleteEmployee(employee.id).subscribe({
            next: () => {
              this.loadEmployees();
              this.snackBar.open(`Employee #${employee.id} has been deleted successfully`);
            },
            error: (err: HttpErrorResponse) => {
              this.snackBar.open(`Employee #${employee.id} cannot be deleted. ${err.message}`);
            }
          });
        }

      }
    });
  }

  //#region Private Functions

  private loadEmployees(): void {

    this.employeeSvc.getEmployees().subscribe({
      next: (employeesFromApi: EmployeeList[]) => {
        this.employeeDS = employeesFromApi;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
      }
    });
  }
  //#endregion



}
