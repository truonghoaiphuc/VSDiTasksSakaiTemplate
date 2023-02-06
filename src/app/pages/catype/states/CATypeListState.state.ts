import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { CAType } from 'src/app/Models/catype.model';

export interface CATypeListState {
    catypes: CAType[];
    loading: boolean;
}

export const CATYPE_LIST_STATE = new InjectionToken<RxState<CATypeListState>>(
    'CATYPE_LIST_STATE'
);
