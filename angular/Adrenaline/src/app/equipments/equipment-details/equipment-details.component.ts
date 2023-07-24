import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentDetails } from 'src/app/models/equipments/equipmentDetails.model';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent implements OnInit {
  
  equipmentId!: number;
  equipment!: EquipmentDetails;

  constructor(
              private equipmentSvc: EquipmentService,
              private activatedRoute: ActivatedRoute
              ) {}
  
  
  ngOnInit(): void {
   
    this.getIdFromURL();

    if(this.equipmentId) {

      this.loadEquipment();
    }

  }


  //#region Private Functions

  private getIdFromURL(): void {

    if(this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.equipmentId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private loadEquipment(): void {
    
    this.equipmentSvc.getEquipment(this.equipmentId).subscribe({
      next:(equipmentFromApi: EquipmentDetails) => {
          this.equipment = equipmentFromApi;
      },
      error:(err: HttpErrorResponse) => {
          console.error(err.message);
      }
    });
  }
  
  //#endregion
}
