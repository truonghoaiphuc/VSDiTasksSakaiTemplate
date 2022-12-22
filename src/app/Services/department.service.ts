import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../Models/department.model';

@Injectable({
    providedIn: 'root',
})
export class DepartmentService {
    constructor(private _httpClient: HttpClient) {}

    GetDepts(): Observable<Department[]> {
        return this._httpClient.get<Department[]>('/api/dept');
    }
    GetDeptsWithComp(): Observable<any[]> {
        return this._httpClient.get<any[]>('/api/Company/all');
    }
}
