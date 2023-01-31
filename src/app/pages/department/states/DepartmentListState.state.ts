import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Department } from 'src/app/Models/department.model';

export interface DepartmentListState {
    departments: Department[];
    loading: boolean;
}

export const DEPARTMENT_LIST_STATE = new InjectionToken<
    RxState<DepartmentListState>
>('DEPARTMENT_LIST_STATE');
