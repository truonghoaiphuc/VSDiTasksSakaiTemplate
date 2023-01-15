import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyResponse } from '../Models/myresponse.model';
import { Role } from '../Models/role.model';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    loggedInUser!:any;
    constructor(private _httpClient: HttpClient) {
    }

    public GetRoles(): Observable<Role[]> {
        return this._httpClient.get<Role[]>('/api/Role');
    }

    public CreateOrEditRole(
        role: Role,
        editRole: Role
    ): Observable<MyResponse> {        
        if (editRole) {
            role.roleId = editRole.roleId;
            role.roleName = editRole.roleName;
            role.isAdmin = editRole.isAdmin;
            return this._httpClient.put<MyResponse>('api/Role/update', role);
        } else {
            return this._httpClient.post<MyResponse>('api/Role/add', role);
        }
    }

    public DeleteRole(id: string): Observable<MyResponse> {
        return this._httpClient.delete<MyResponse>(`/api/Role/delete?code=${id}`);
    }
}
