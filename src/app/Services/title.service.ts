import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyResponse } from '../Models/myresponse.model';
import { Title } from '../Models/title.model';

@Injectable({
    providedIn: 'root',
})
export class TitleService {
    loggedInUser!: any;
    constructor(private _http: HttpClient) {}

    public GetTitles(): Observable<Title[]> {
        return this._http.get<Title[]>('/api/Title');
    }

    public CreateOrEditTitle(
        title: Title,
        editTitle: Title
    ): Observable<MyResponse> {
        if (editTitle) {
            title.TitleId = editTitle.TitleId;
            return this._http.put<MyResponse>('/api/Title/update', title);
        } else {
            return this._http.post<MyResponse>('/api/Title/add', title);
        }
    }

    public DeleteTitle(title: Title): Observable<MyResponse> {
        return this._http.put<MyResponse>(`/api/Title/delete`, title);
    }
}
