import { Inject, Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenService } from '../Services/authen.service';
import stringHelper from '../commons/string.helper';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor {
    constructor(
        @Inject('BASE_URL') private _baseUrl: string,
        private _authService: AuthenService,
        private router: Router
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return this._authService
            .getToken()
            .pipe(
                mergeMap((token) =>
                    this.processRequestWithToken(token, request, next)
                )
            );
    }

    private processRequestWithToken(
        token: string | null,
        req: HttpRequest<any>,
        next: HttpHandler
    ) {
        req = req.clone({
            url:
                stringHelper.trimEnding(this._baseUrl, '/') +
                '/' +
                stringHelper.trimLeading(req.url, '/'),
        });

        if (!!token && token.length > 0) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        console.log(req);
        return next.handle(req).pipe(catchError(this.handleError));
    }

    private handleError = (err: any) => {
        if (err.status === 401) {
            //return login page
            //clear old token
            this.router.navigate(['login']);
            this._authService.clearToken();
        }
        //todo
        return throwError({
            success: false,
            statusCode: 'internal_server_error',
        });
    };
    private isSameOrigin(req: any): boolean {
        //absolute url with the same origin
        if (req.url.startsWith(`${window.location.origin}/`)) {
            return true;
        }
        //a protocol relative url with the same origin
        if (req.url.startsWith(`//${window.location.host}/`)) {
            return true;
        }

        //relative url
        if (/^\/[^\/].*/.test(req.url)) {
            return true;
        }
        return false;
    }
}
