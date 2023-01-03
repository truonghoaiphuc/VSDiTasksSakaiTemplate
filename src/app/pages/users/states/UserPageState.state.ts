import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Department } from 'src/app/demo/api/customer';
import { Role } from 'src/app/Models/role.model';

export interface UserPageState {
    roles: Role[];
    depts: any[];
    titles: any[];
}

export const USER_PAGE_STATE = new InjectionToken<RxState<UserPageState>>(
    'USER_PAGE_STATE'
);
