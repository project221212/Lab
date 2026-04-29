import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GroupMasterModel {
  gCode?: number | null;
  groupName: string;
  mUser?: string;
  // additional fields based on UI, mapping them just in case
  shortName?: string;
  description?: string;
  displayOrder?: number;
  status?: number | string | boolean;
}

@Injectable({ providedIn: 'root' })
export class GroupMasterService {
  private apiUrl = 'https://localhost:7283/api/Master/GroupMaster';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAll`);
  }

  getById(gCode: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetById/${gCode}`);
  }

  insert(model: GroupMasterModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Insert`, model);
  }

  update(model: GroupMasterModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Update`, model);
  }

  delete(gCode: number, mUser: string = 'System'): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Delete`, { gCode, mUser });
  }
}
