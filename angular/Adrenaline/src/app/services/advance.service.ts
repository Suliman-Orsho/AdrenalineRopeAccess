import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Advance } from '../models/advances/advance.model';
import { AdvanceList } from '../models/advances/advanceList.model';
import { Lookup} from '../models/lookups/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class AdvanceService {

  apiUrl: string ="https://localhost:7255/api/Advances";

  constructor(private http: HttpClient) { }

  getAdvances(): Observable<AdvanceList[]> {

    return this.http.get<AdvanceList[]>(`${this.apiUrl}/GetAdvances`);
  }

  getAdvancesLookup(): Observable<Lookup[]> {

    return this.http.get<Lookup[]>(`${this.apiUrl}/GetAdvancesLookup`);
  }

  getAdvance(advanceId : number): Observable<AdvanceList> {

    return this.http.get<AdvanceList>(`${this.apiUrl}/GetAdvance/${advanceId}`);
  }

  getAdvanceForEdit(advanceId: number): Observable<Advance> {

    return this.http.get<Advance>(`${this.apiUrl}/GetAdvanceForEdit/${advanceId}`);
  }

  createAdvance(advance: Advance): Observable<any> {
    
    return this.http.post<Advance>(`${this.apiUrl}/CreateAdvance`, advance);
  }

  editAdvance(advance: Advance): Observable<any> {

    return this.http.put<Advance>(`${this.apiUrl}/EditAdvance/${advance.id}`, advance);
  }

  deleteAdvance(advanceId: number): Observable<any> {

    return this.http.delete<Advance>(`${this.apiUrl}/DeleteAdvance/${advanceId}`);
  }
}
