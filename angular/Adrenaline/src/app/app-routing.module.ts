import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditAdvanceComponent } from './advance/add-edit-advance/add-edit-advance.component';
import { AdvanceDetailsComponent } from './advance/advance-details/advance-details.component';
import { AdvanceComponent } from './advance/advance.component';
import { AddEditEmployeeComponent } from './employee/add-edit-employee/add-edit-employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEditEquipmentComponent } from './equipments/add-edit-equipment/add-edit-equipment.component';
import { EquipmentDetailsComponent } from './equipments/equipment-details/equipment-details.component';
import { EquipmentComponent } from './equipments/equipment.component';
import { HomeComponent } from './home/home.component';
import { AddEditProjectComponent } from './projects/add-edit-project/add-edit-project.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectComponent } from './projects/project.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  
  {path: 'employees', component: EmployeeComponent},
  {path: 'employees/details/:id', component: EmployeeDetailsComponent},
  {path: 'employees/add', component: AddEditEmployeeComponent},
  {path: 'employees/edit/:id', component: AddEditEmployeeComponent},

  {path: 'advances', component: AdvanceComponent},
  {path: 'advances/details/:id', component: AdvanceDetailsComponent},
  {path: 'advances/add', component: AddEditAdvanceComponent},
  {path: 'advances/edit/:id', component: AddEditAdvanceComponent},

  {path: 'projects', component: ProjectComponent},
  {path: 'projects/details/:id', component: ProjectDetailsComponent},
  {path: 'projects/add', component: AddEditProjectComponent},
  {path: 'projects/edit/:id', component: AddEditProjectComponent},

  {path: 'equipments', component: EquipmentComponent},
  {path: 'equipments/details/:id', component: EquipmentDetailsComponent},
  {path: 'equipments/add', component: AddEditEquipmentComponent},
  {path: 'equipments/edit/:id', component: AddEditEquipmentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
