import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../Models/department.model';
import { MyResponse } from '../Models/myresponse.model';

@Injectable({
    providedIn: 'root',
})
export class DepartmentService {
    constructor(private _http: HttpClient) {}

    GetDepts(): Observable<Department[]> {
        return this._http.get<Department[]>('/api/dept');
    }

    public CreateOrEditDepartment(
        department: Department,
        editDepartment: Department
    ): Observable<MyResponse> {
        if (editDepartment) {
            department.deptCode = editDepartment.deptCode;
            return this._http.put<MyResponse>('/api/dept/update', department);
        } else {
            return this._http.post<MyResponse>('/api/dept/add', department);
        }
    }

    public DeleteDepartment(department: Department): Observable<MyResponse> {
        return this._http.put<MyResponse>(`/api/dept/delete`, department);
    }
}
