import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Role } from 'src/app/Models/role.model';

export interface RoleListState {
    roles: Role[];
}

export const ROLE_LIST_STATE = new InjectionToken<RxState<RoleListState>>(
    'ROLE_LIST_STATE'
);
