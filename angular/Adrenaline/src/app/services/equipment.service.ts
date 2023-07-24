import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../models/equipments/equipment.model';
import { EquipmentDetails } from '../models/equipments/equipmentDetails.model';
import { EquipmentList } from '../models/equipments/equipmentList.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  apiUrl: string ="https://localhost:7255/api/Equipments";

  constructor(private http: HttpClient) { }

  getEquipments(): Observable<EquipmentList[]> {

    return this.http.get<EquipmentList[]>(`${this.apiUrl}/GetEquipments`);
  }

  getEquipment(equipmentId : number): Observable<EquipmentDetails> {

    return this.http.get<EquipmentDetails>(`${this.apiUrl}/GetEquipment/${equipmentId}`);
  }

  getEquipmentForEdit(equipmentId: number): Observable<Equipment> {

    return this.http.get<Equipment>(`${this.apiUrl}/GetEquipmentForEdit/${equipmentId}`);
  }

  createEquipment(equipment: Equipment): Observable<any> {
    
    return this.http.post<Equipment>(`${this.apiUrl}/CreateEquipment`, equipment);
  }

  editEquipment(equipment: Equipment): Observable<any> {

    return this.http.put<Equipment>(`${this.apiUrl}/EditEquipment/${equipment.id}`, equipment);
  }

  deleteEquipment(equipmentId: number): Observable<any> {

    return this.http.delete<Equipment>(`${this.apiUrl}/DeleteEquipment/${equipmentId}`);
  }

  // getEquipmentsLookup(): Observable<Lookup[]> {

  //   return this.http.get<Lookup[]>(`${this.apiUrl}/GetEquipmentsLookup`);
  // }
}
