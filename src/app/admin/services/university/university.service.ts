import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UniversityRM } from '../../view-models';


@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private _http: HttpClient) { }

  createUniversity(body: any): Observable<any> {
    return this._http.post<any>('https://localhost:44344/api/v1/university', body);
  }

  getAllUniversity(): Observable<any>{
    return this._http.get('https://localhost:44344/api/v1/university');
  }

  getUniversityById(id: string): Observable<any>{
    return this._http.get('https://localhost:44344/api/v1/university/detail/' + `${id}`);
  }

  updateUniversity(body: any): Observable<any>{
    return this._http.put<any>('https://localhost:44344/api/v1/university', body);
  }
}
