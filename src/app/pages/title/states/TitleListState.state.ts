import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Title } from 'src/app/Models/title.model';

export interface TitleListState {
    titles: Title[];
    loading: boolean;
}

export const TITLE_LIST_STATE = new InjectionToken<RxState<TitleListState>>(
    'TITLE_LIST_STATE'
);
