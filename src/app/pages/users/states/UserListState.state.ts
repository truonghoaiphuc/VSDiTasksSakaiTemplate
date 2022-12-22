import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { UserInfo } from 'src/app/Models/user.model';
import { Department } from 'src/app/Models/department.model';

export interface UserListState {
    users: UserInfo[];
    depts: any[];
}

export const USER_LIST_STATE = new InjectionToken<RxState<UserListState>>(
    'USER_LIST_STATE'
);
