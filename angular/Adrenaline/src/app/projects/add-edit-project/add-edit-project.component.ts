import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { Work } from 'src/app/enums/work.enum';
import { Lookup } from 'src/app/models/lookups/lookup.model';
import { Project } from 'src/app/models/projects/project.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.css']
})
export class AddEditProjectComponent implements OnInit {

  projectForm!: FormGroup;
  employeesLookup: Lookup[] = [];

  workEnum = Work;

  projectId!: number;
  project!: Project;
  pageMode: PageMode = PageMode.add;

  pageModeEnum = PageMode;

  constructor(
    private fb: FormBuilder,
    private projectSvc: ProjectService,
    private employeeSvc: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.buildForm();

    this.loadEmployeesLookup();

    this.getProjectIdFromUrl();

    if (this.pageMode == PageMode.edit) {

      this.loadProject();
    }

  }

  submitForm() {

    if (this.projectForm.valid) {

      if (this.pageMode == PageMode.add) {

        this.createProject();
      }
      else {
        this.saveProject();
      }
    }
  }

  //#region Private Functions

  private buildForm(): void {

    this.projectForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      work: ['', Validators.required],
      income: ['', Validators.required],
      isPaid:['', Validators.required],
      spending:['', Validators.required],
      startDate:[''],
      finishDate:[''],
      clientNumber:['', Validators.required],
      linesCount:['', Validators.required],
      employeeIds: ['', Validators.required]
    });
  }

  private loadEmployeesLookup() {

    this.employeeSvc.getEmployeesLookup().subscribe({
      next: (employeesLookupFromApi: Lookup[]) => {
        this.employeesLookup = employeesLookupFromApi;
      }
    });
  }

  private getProjectIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.edit;
    }
  }

  private loadProject(): void {

    this.projectSvc.getProjectForEdit(this.projectId).subscribe({
      next: (projectFromApi: Project) => {

        this.project = projectFromApi;
        this.patchProjectForm();

      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  private patchProjectForm() {

    this.projectForm.patchValue({
      id: this.project.id,
      name: this.project.name,
      work: this.project.work,
      income: this.project.income,
      isPaid: this.project.isPaid,
      spending: this.project.spending,
      startDate: this.project?.startDate,
      finishDate: this.project?.finishDate,
      clientNumber: this.project.clientNumber,
      linesCount: this.project.linesCount,
      employeeIds: this.project.employeeIds
    });
  }

  private createProject(): void {

    this.projectSvc.createProject(this.projectForm.value).subscribe({
      next: (projectFromApi: Project) => {
        this.snackBar.open("Project has been created Successfully");
        this.router.navigate(['projects']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  private saveProject(): void {

    this.projectSvc.editProject(this.projectForm.value).subscribe({
      next: (projectFromApi: Project) => {
        this.snackBar.open("Project has been updated Successfully");
        this.router.navigate(['projects']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  //#endregion
}