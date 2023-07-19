import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditEmployeeComponent } from './employee/add-edit-employee/add-edit-employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [

  {path: 'employee', component: EmployeeComponent},
  {path: 'employee/details/:id', component: EmployeeDetailsComponent},
  {path: 'employee/add', component: AddEditEmployeeComponent},
  {path: 'employee/edit/:id', component: AddEditEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
