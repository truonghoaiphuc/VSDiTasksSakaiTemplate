import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Company } from 'src/app/Models/company.model';

export interface CompanyListState {
    companies: Company[];
    loading: boolean;
}

export const COMPANY_LIST_STATE = new InjectionToken<RxState<CompanyListState>>(
    'COMPANY_LIST_STATE'
);
