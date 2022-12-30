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
        return this._http.get<UserInfo>(`/api/User/${id}`);
    }

    public GetTitles(): Observable<any> {
        return this._http.get<any>('/api/Title');
    }

    public CreateUser(us: UserInfo, avatar: string): Observable<MyResponse> {
        us.avatar = avatar;
        us.status = UserStatus.ACTIVE;
        return this._http.post<MyResponse>('api/User/add', us);
    }

    public DeleteUser(id: number): Observable<MyResponse> {
        return this._http.delete<MyResponse>(`/api/User/${id}`);
    }
}
