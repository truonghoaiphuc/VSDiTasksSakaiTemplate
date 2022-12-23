import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyResponse } from '../Models/myresponse.model';
import { UserInfo } from '../Models/user.model';

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

    public GetTitles(): Observable<any> {
        return this._http.get<any>('/api/Title');
    }

    public CreateUser(us: UserInfo): Observable<MyResponse> {
        return this._http.post<MyResponse>('api/User/add', us);
    }

    public DeleteUser(id: number): Observable<MyResponse> {
        return this._http.delete<MyResponse>(`/api/User/${id}`);
    }
}
