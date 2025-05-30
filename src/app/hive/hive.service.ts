import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hive } from './hive.model';

@Injectable({
  providedIn: 'root'
})
export class HiveService {
  private apiUrl = 'http://localhost:3000/api/hives';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Hive[]> {
    return this.http.get<Hive[]>(this.apiUrl);
  }

  getById(id: string): Observable<Hive> {
    return this.http.get<Hive>(`${this.apiUrl}/${id}`);
  }

  create(hive: Hive): Observable<Hive> {
    return this.http.post<Hive>(this.apiUrl, hive);
  }

  update(id: string, hive: Hive): Observable<Hive> {
    return this.http.put<Hive>(`${this.apiUrl}/${id}`, hive);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
