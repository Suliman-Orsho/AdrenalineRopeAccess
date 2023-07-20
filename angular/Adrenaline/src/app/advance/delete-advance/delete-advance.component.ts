import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdvanceList } from 'src/app/models/advances/advanceList.model';

@Component({
  selector: 'app-delete-advance',
  templateUrl: './delete-advance.component.html',
  styleUrls: ['./delete-advance.component.css']
})
export class DeleteAdvanceComponent implements OnInit {

  advance!: AdvanceList;

  constructor(
    public dialogRef: MatDialogRef<DeleteAdvanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdvanceList,
  ) { }

  ngOnInit(): void {

    this.advance = this.data;
  }
}