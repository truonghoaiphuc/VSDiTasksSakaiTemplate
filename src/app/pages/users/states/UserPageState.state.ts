import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Role } from 'src/app/Models/role.model';

export interface UserPageState {
    roles: Role[];
    titles: any[];
}

export const USER_PAGE_STATE = new InjectionToken<RxState<UserPageState>>(
    'USER_PAGE_STATE'
);
