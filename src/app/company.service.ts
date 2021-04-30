import { Employee } from './employee';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public eventEmmiter = new EventEmitter();
  private baseUrl = 'http://localhost:3000';
  private header = new HttpHeaders(
    {
      'Content-Type': 'application/json'
    });

  constructor(private httpClient: HttpClient) { }

  postEmployee(data: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.baseUrl}/employee`, data, { headers: this.header });
  }
  getAllEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseUrl}/employee`);
  }

  putEmployee(data: Employee, id: number): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseUrl}/employee/${id}`, data, { headers: this.header });
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/employee/${id}`);
  }

}
