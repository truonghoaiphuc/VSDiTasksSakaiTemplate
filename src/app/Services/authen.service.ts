import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, Observable, of } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { LoggedInUser } from '../Models/LoggedInUser';
import { StorageService } from './storage.service';
import jwt_decode from 'jwt-decode';
import { CurrentUser } from '../Models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthenService {
    constructor(private _http: HttpClient, private _storage: StorageService) {}

    private _userSubject = new BehaviorSubject<CurrentUser | null>(null);

    persistToken(token: string) {
        this._storage.set('token', token);
    }

    getToken(): Observable<string | null> {
        return of(this._storage.get('token') || '');
    }

    clearToken() {
        this._storage.set('token', null);
    }

    logout(): void {
        this.clearToken();
    }

    isUserAuthenticated(): Observable<boolean> {
        return this.getUser().pipe(map((u) => !!u));
    }

    getUser() {
        return concat(
            this._userSubject.pipe(
                take(1),
                filter((u) => !!u)
            ),
            this.getCurrentUser().pipe(
                filter((u) => !!u),
                tap((u) => this._userSubject.next(u))
            ),
            this._userSubject.asObservable()
        );
    }

    getCurrentUser(): Observable<CurrentUser | null> {
        const token = this._storage.get('token');
        if (!token) {
            return of(null);
        }

        let claims: any;

        try {
            claims = jwt_decode(token);
        } catch {
            return of(null);
        }

        //check expiry
        if (!claims || Date.now().valueOf() > claims.expiry * 1000) {
            return of(null);
        }

        const user: CurrentUser = {
            userName: claims[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
            ] as string,
            fullName: claims[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
            ] as string,
            role: claims[
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ] as string,
        };

        return of(user);
    }

    getLoggedInUser(): LoggedInUser {
        let user!: LoggedInUser;
        if (this.isUserAuthenticated()) {
            var usdata = localStorage.getItem('token');
            if (usdata != null) {
                var userData = JSON.parse(usdata);
                user = new LoggedInUser(
                    userData.access_token,
                    userData.username,
                    userData.fullName,
                    userData.email,
                    userData.Phong,
                    userData.Title,
                    userData.avatar,
                    userData.roles,
                    userData.permissions
                );
            }
            // var userData =
            //  JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
        }
        return user;
    }
}
