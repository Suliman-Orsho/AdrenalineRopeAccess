import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentList } from 'src/app/models/equipments/equipmentList.model';

@Component({
  selector: 'app-delete-equipment',
  templateUrl: './delete-equipment.component.html',
  styleUrls: ['./delete-equipment.component.css']
})
export class DeleteEquipmentComponent implements OnInit {

  equipment!: EquipmentList;

  constructor(
    public dialogRef: MatDialogRef<DeleteEquipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EquipmentList,
  ) { }

  ngOnInit(): void {

    this.equipment = this.data;
  }
}
