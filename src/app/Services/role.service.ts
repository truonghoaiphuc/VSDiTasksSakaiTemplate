import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../Models/role.model';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    constructor(private _httpClient: HttpClient) {}

    public GetRoles(): Observable<Role[]> {
        return this._httpClient.get<Role[]>('/api/Role');
    }
}
