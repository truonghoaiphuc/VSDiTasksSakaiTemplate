import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { Message, MessageService } from 'primeng/api';
import {
    catchError,
    filter,
    mergeMap,
    Observable,
    of,
    Subject,
    tap,
} from 'rxjs';
import { AuthenService } from 'src/app/Services/authen.service';
import { UserService } from 'src/app/Services/user.service';
import { LoginState } from '../state';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [RxState, MessageService],
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];
    msgs: Message[] = [];

    loginForm!: FormGroup;
    loading: boolean = false;
    onSubmit = new Subject<void>();
    onSubmitHandler$ = new Subject<{ userName: string; password: string }>();

    get state$(): Observable<LoginState> {
        return this._state.select();
    }

    get loading$(): Observable<boolean> {
        return this._state.select('loading');
    }

    constructor(
        private _userService: UserService,
        private _authService: AuthenService,
        private _router: Router,
        private formBuilder: FormBuilder,
        private _state: RxState<LoginState>
    ) {
        this._state.set({ hasError: false, loading: false });
        this.msgs = [
            {
                severity: 'error',
                summary: 'Đăng nhập thất bại',
                detail: 'Tên đăng nhập hoặc mật khẩu không hợp lệ',
            },
        ];
    }

    initForm(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    private manageEvents() {
        this._state.hold(this.onSubmit, () => {
            const valid = this.loginForm.valid;
            this._state.set({
                hasError: !valid,
            });
            if (!valid) {
                return;
            }
            this._state.set({ loading: true });
            this.onSubmitHandler$.next({
                userName: this.loginForm.controls['userName'].value,
                password: this.loginForm.controls['password'].value,
            });
        });
    }

    private connectState(): void {
        const handler$ = this.onSubmitHandler$.pipe(
            mergeMap((data) =>
                this._userService
                    .login(data.userName, data.password)
                    .pipe(tap(() => this._state.set({ loading: true })))
                    .pipe(
                        catchError((err: { statusCode: string }) =>
                            of({ statusCode: err.statusCode, token: '' })
                        )
                    )
            )
        );
        this._state.connect(handler$, (prev, curr) => ({
            ...prev,
            statusCode: curr.statusCode,
            hasError: !curr.token,
            token: curr.token,
            loading: false,
        }));

        this._state
            .select('token')
            .pipe(filter((x) => !!x))
            .subscribe({
                next: (token) => {
                    this._authService.persistToken(token);
                    this._router.navigate(['dashboard']);
                },
            });
    }
    showErrorViaMessages() {
        this.msgs = [];
        this.msgs.push({
            severity: 'error',
            summary: 'Error Message',
            detail: 'Validation failed',
        });
    }
    ngOnInit(): void {
        this.initForm();
        this.manageEvents();
        this.connectState();
    }
}
