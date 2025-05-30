import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiary } from './apiary.model';

@Injectable({
  providedIn: 'root'
})
export class ApiaryService {
  private apiUrl = 'http://localhost:3500/api/apiaries';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Apiary[]> {
    return this.http.get<Apiary[]>(this.apiUrl);
  }

  getById(id: string): Observable<Apiary> {
    return this.http.get<Apiary>(`${this.apiUrl}/${id}`);
  }

  create(apiary: Apiary): Observable<Apiary> {
    return this.http.post<Apiary>(this.apiUrl, apiary);
  }

  update(id: string, apiary: Apiary): Observable<Apiary> {
    return this.http.put<Apiary>(`${this.apiUrl}/${id}`, apiary);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}