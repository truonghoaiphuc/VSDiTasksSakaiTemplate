import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { UserInfo } from 'src/app/Models/user.model';

export interface UserListState {
    users: UserInfo[];
    loading:boolean;
}

export const USER_LIST_STATE = new InjectionToken<RxState<UserListState>>(
    'USER_LIST_STATE'
);
