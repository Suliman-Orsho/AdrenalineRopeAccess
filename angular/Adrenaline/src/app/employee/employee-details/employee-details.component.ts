import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageUploaderConfig } from 'src/app/directives/image-uploader/image-uploader.config';
import { UploaderMode, UploaderStyle, UploaderType } from 'src/app/directives/image-uploader/uploader.enums';
import { UploaderImage } from 'src/app/directives/image-uploader/UploaderImage.data';
import { Address } from 'src/app/enums/address.enum';
import { Gender } from 'src/app/enums/gender.enum';
import { Nationality } from 'src/app/enums/nationality.enum';
import { Rank } from 'src/app/enums/rank.enum';
import { Work } from 'src/app/enums/work.enum';
import { EmployeeDetails } from 'src/app/models/employees/employeeDetails.model';
import { ProjectDetails } from 'src/app/models/projects/projectDetails.model';
import { ProjectList } from 'src/app/models/projects/projectList.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  projectDS: ProjectList[] = [];
  projectColumns: string[] = ['name', 'work'];

  images: UploaderImage[] = [];
  uploaderConfig = new ImageUploaderConfig(UploaderStyle.Profile, UploaderMode.Details, UploaderType.Single);
  
  employeeId!: number;
  employee!: EmployeeDetails;

  address = Address;
  gender = Gender;
  nationality = Nationality;
  rank = Rank;

  work = Work;


  constructor(
              private employeeSvc: EmployeeService,
              private activatedRoute: ActivatedRoute
              ) {}
  
  
  ngOnInit(): void {
   
    this.getIdFromURL();

    if(this.employeeId) {

      this.loadEmployee();
    }

  }


  //#region Private Functions

  private getIdFromURL(): void {

    if(this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    }
  }

  private loadEmployee(): void {
    
    this.employeeSvc.getEmployee(this.employeeId).subscribe({
      next:(employeeFromApi: EmployeeDetails) => {
          this.employee = employeeFromApi;
          this.images = this.employee.images;
          this.projectDS = this.employee.projects;
      },
      error:(err: HttpErrorResponse) => {
          console.error(err.message);
      }
    });
  }
  
  //#endregion
}
