import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyResponse } from '../Models/myresponse.model';
import { UserInfo, UserStatus } from '../Models/user.model';
import { AuthenService } from './authen.service';

declare type LoginResponse = {
    token: string;
    statusCode: string;
};

@Injectable({
    providedIn: 'root',
})
export class UserService {
    loggedInUser!: any;
    constructor(
        private _http: HttpClient,
        private authenService: AuthenService
    ) {
        this.authenService.getCurrentUser().subscribe((us) => {
            this.loggedInUser = us;
        });
    }

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

    public GetUserPermission(userName: string): Observable<any> {
        return this._http.get<any>(`/api/User/${userName}`);
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
        console.log(this.loggedInUser);
        if (editUser) {
            us.id = editUser.id;
            us.status = editUser.status;
            us.updatedId = this.loggedInUser.userName;
            return this._http.put<MyResponse>('api/User/update', us);
        } else {
            us.status = UserStatus.ACTIVE;
            us.createdId = this.loggedInUser.userName;
            return this._http.post<MyResponse>('api/User/add', us);
        }
    }

    public DeleteUser(id: number): Observable<MyResponse> {
        return this._http.delete<MyResponse>(`/api/User/${id}`);
    }
}
