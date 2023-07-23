import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectList } from 'src/app/models/projects/projectList.model';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

  project!: ProjectList;

  constructor(
    public dialogRef: MatDialogRef<DeleteProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectList,
  ) { }

  ngOnInit(): void {

    this.project = this.data;
  }
}