import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Work } from '../enums/work.enum';
import { ProjectList } from '../models/projects/projectList.model';
import { ProjectService } from '../services/project.service';
import { DeleteProjectComponent } from './delete-project/delete-project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectDS: ProjectList[] = [];
  projectColumns: string[] = ['name', 'work', 'income', 'isPaid', 'spending', 'startDate', 'finishDate', 'actions' ];

  startDate = this.projectColumns?.[5];


  work = Work;

  constructor(
    private projectSvc: ProjectService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
     ) {}

  ngOnInit(): void {

    this.loadProjects();
  }

  openDeleteDialog(project: ProjectList) {

    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      data: project
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {

        if (result) {
          this.projectSvc.deleteProject(project.id).subscribe({
            next: () => {
              this.loadProjects();
              this.snackBar.open(`Project #${project.id} has been deleted successfully`);
            },
            error: (err: HttpErrorResponse) => {
              this.snackBar.open(`Project #${project.id} cannot be deleted. ${err.message}`);
            }
          });
        }

      }
    });
  }

  //#region Private Functions

  private loadProjects(): void {

    this.projectSvc.getProjects().subscribe({
      next: (projectsFromApi: ProjectList[]) => {
        this.projectDS = projectsFromApi;
        
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
      }
    });
  }

  //#endregion
}
