import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyResponse } from '../Models/myresponse.model';
import { UserInfo, UserStatus } from '../Models/user.model';

declare type LoginResponse = {
    token: string;
    statusCode: string;
};

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private _http: HttpClient) {}

    public login(
        username: string,
        password: string
    ): Observable<LoginResponse> {
        return this._http.post<any>(`/api/auth/login`, { username, password });
    }

    public GetAllUsers(): Observable<any> {
        return this._http.get<any>(`/api/user`);
    }

    public GetUserDetail(id: number): Observable<UserInfo> {
        return this._http.get<UserInfo>(`/api/User/${id}/detail`);
    }

    public GetTitles(): Observable<any> {
        return this._http.get<any>('/api/Title');
    }

    public CreateOrEditUser(
        us: UserInfo,
        avatar: string,
        editUser: UserInfo
    ): Observable<MyResponse> {
        us.avatar = avatar;
        if (editUser) {
            us.id = editUser.id;
            return this._http.put<MyResponse>('api/User/update', us);
        } else {
            us.status = UserStatus.ACTIVE;
            return this._http.post<MyResponse>('api/User/add', us);
        }
    }

    public DeleteUser(id: number): Observable<MyResponse> {
        return this._http.delete<MyResponse>(`/api/User/${id}`);
    }
}
