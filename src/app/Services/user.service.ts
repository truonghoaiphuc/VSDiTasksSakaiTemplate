import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../demo/api/customer';

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

    public GetAllUsers() {
        return this._http
            .get<any>('assets/demo/data/users.json')
            .toPromise()
            .then((res) => res.data as User[])
            .then((data) => data);
    }
}
