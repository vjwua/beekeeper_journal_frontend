import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inspection } from './inspection.model';

@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private apiUrl = 'http://localhost:3000/api/inspections';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Inspection[]> {
    return this.http.get<Inspection[]>(this.apiUrl);
  }

  getById(id: string): Observable<Inspection> {
    return this.http.get<Inspection>(`${this.apiUrl}/${id}`);
  }

  create(inspection: Inspection): Observable<Inspection> {
    return this.http.post<Inspection>(this.apiUrl, inspection);
  }

  update(id: string, inspection: Inspection): Observable<Inspection> {
    return this.http.put<Inspection>(`${this.apiUrl}/${id}`, inspection);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
