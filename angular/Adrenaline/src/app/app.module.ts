import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AddEditEmployeeComponent } from './employee/add-edit-employee/add-edit-employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { DeleteEmployeeComponent } from './employee/delete-employee/delete-employee.component';
import { HomeComponent } from './home/home.component';
import { AdvanceComponent } from './advance/advance.component';
import { AdvanceDetailsComponent } from './advance/advance-details/advance-details.component';
import { AddEditAdvanceComponent } from './advance/add-edit-advance/add-edit-advance.component';
import { DeleteAdvanceComponent } from './advance/delete-advance/delete-advance.component';
import { ProjectComponent } from './projects/project.component';
import { AddEditProjectComponent } from './projects/add-edit-project/add-edit-project.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddEditEmployeeComponent,
    EmployeeDetailsComponent,
    EnumToArrayPipe,
    DeleteEmployeeComponent,
    HomeComponent,
    AdvanceComponent,
    AdvanceDetailsComponent,
    AddEditAdvanceComponent,
    DeleteAdvanceComponent,
    ProjectComponent,
    AddEditProjectComponent,
    ProjectDetailsComponent,
    DeleteProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 2500,
        panelClass: ['bg-dark', 'text-light']
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
