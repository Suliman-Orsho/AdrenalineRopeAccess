import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/projects/project.model';
import { ProjectDetails } from '../models/projects/projectDetails.model';
import { ProjectList } from '../models/projects/projectList.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiUrl: string ="https://localhost:7255/api/Projects";

  constructor(private http: HttpClient) { }

  getProjects(): Observable<ProjectList[]> {

    return this.http.get<ProjectList[]>(`${this.apiUrl}/GetProjects`);
  }

  getProject(projectId : number): Observable<ProjectDetails> {

    return this.http.get<ProjectDetails>(`${this.apiUrl}/GetProject/${projectId}`);
  }

  getProjectForEdit(projectId: number): Observable<Project> {

    return this.http.get<Project>(`${this.apiUrl}/GetProjectForEdit/${projectId}`);
  }

  createProject(project: Project): Observable<any> {
    
    return this.http.post<Project>(`${this.apiUrl}/CreateProject`, project);
  }

  editProject(project: Project): Observable<any> {

    return this.http.put<Project>(`${this.apiUrl}/EditProject/${project.id}`, project);
  }

  deleteProject(projectId: number): Observable<any> {

    return this.http.delete<Project>(`${this.apiUrl}/DeleteProject/${projectId}`);
  }

  // getProjectsLookup(): Observable<Lookup[]> {

  //   return this.http.get<Lookup[]>(`${this.apiUrl}/GetProjectsLookup`);
  // }
}
