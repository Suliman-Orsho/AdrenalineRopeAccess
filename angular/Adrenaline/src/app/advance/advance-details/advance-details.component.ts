import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdvanceList } from 'src/app/models/advances/advanceList.model';
import { AdvanceService } from 'src/app/services/advance.service';

@Component({
  selector: 'app-advance-details',
  templateUrl: './advance-details.component.html',
  styleUrls: ['./advance-details.component.css']
})
export class AdvanceDetailsComponent implements OnInit {
  
  advanceId!: number;
  advance!: AdvanceList;

  constructor(
              private advanceSvc: AdvanceService,
              private activatedRoute: ActivatedRoute
              ) {}
  
  
  ngOnInit(): void {
   
    this.getIdFromURL();

    if(this.advanceId) {

      this.loadAdvance();
    }

  }


  //#region Private Functions

  private getIdFromURL(): void {

    if(this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.advanceId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private loadAdvance(): void {
    
    this.advanceSvc.getAdvance(this.advanceId).subscribe({
      next:(advanceFromApi: AdvanceList) => {
          this.advance = advanceFromApi;
      },
      error:(err: HttpErrorResponse) => {
          console.error(err.message);
      }
    });
  }
  
  //#endregion
}
