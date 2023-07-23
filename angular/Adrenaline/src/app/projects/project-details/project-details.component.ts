import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Work } from 'src/app/enums/work.enum';
import { ProjectDetails } from 'src/app/models/projects/projectDetails.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  
  projectId!: number;
  project!: ProjectDetails;

  work = Work;


  constructor(
              private projectSvc: ProjectService,
              private activatedRoute: ActivatedRoute
              ) {}
  
  
  ngOnInit(): void {
   
    this.getIdFromURL();

    if(this.projectId) {

      this.loadProject();
    }

  }


  //#region Private Functions

  private getIdFromURL(): void {

    if(this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private loadProject(): void {
    
    this.projectSvc.getProject(this.projectId).subscribe({
      next:(projectFromApi: ProjectDetails) => {
          this.project = projectFromApi;
      },
      error:(err: HttpErrorResponse) => {
          console.error(err.message);
      }
    });
  }
  
  //#endregion
}
