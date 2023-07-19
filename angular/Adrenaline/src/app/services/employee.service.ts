import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employees/employee.model';
import { EmployeeDetails } from '../models/employees/employeeDetails.model';
import { EmployeeList } from '../models/employees/employeeList.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl: string ="https://localhost:7255/api/Employees";

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<EmployeeList[]> {

    return this.http.get<EmployeeList[]>(`${this.apiUrl}/GetEmployees`);
  }

  getEmployee(employeeId : number): Observable<EmployeeDetails> {

    return this.http.get<EmployeeDetails>(`${this.apiUrl}/GetEmployee/${employeeId}`);
  }

  getEmployeeForEdit(employeeId: number): Observable<Employee> {

    return this.http.get<Employee>(`${this.apiUrl}/GetEmployeeForEdit/${employeeId}`);
  }


  createEmployee(employee: Employee): Observable<any> {
    
    return this.http.post<Employee>(`${this.apiUrl}/CreateEmployee`, employee);
  }

  editEmployee(employee: Employee): Observable<any> {

    return this.http.put<Employee>(`${this.apiUrl}/EditEmployee/${employee.id}`, employee);
  }

  deleteEmployee(employeeId: number): Observable<any> {

    return this.http.delete<Employee>(`${this.apiUrl}/DeleteEmployee/${employeeId}`);
  }
}
