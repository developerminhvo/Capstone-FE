import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MajorService {

  constructor(private _http: HttpClient) { }

  createMajor(body: any): Observable<any> {    
    return this._http.post<any>('https://localhost:44344/api/v1/university/major-addition', body);
  }

  getAllMajor(): Observable<any>{
    return this._http.get('https://localhost:44344/api/v1/major');
  }

  getUniversityById(id: string): Observable<any>{
    return this._http.get('https://localhost:44344/api/v1/university/detail/' + `${id}`);
  }

  updateMajor(body: any): Observable<any>{
    return this._http.put<any>('https://localhost:44344/api/v1/university/major-updation', body);
  }

  addNewMajorSystem(body: any): Observable<any>{
    return this._http.post('https://localhost:44344/api/v1/major', body);
  }

}
