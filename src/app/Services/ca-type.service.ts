import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CAType } from '../Models/catype.model';
import { MyResponse } from '../Models/myresponse.model';

@Injectable({
    providedIn: 'root',
})
export class CaTypeService {
    loggedInUser!: any;
    constructor(private _http: HttpClient) {}

    public GetCATypes(): Observable<CAType[]> {
        return this._http.get<any>('/api/CAType');
    }

    public CreateOrEditCAType(
        caType: CAType,
        editCAType: CAType
    ): Observable<MyResponse> {
        if (editCAType) {
            caType.id = editCAType.id;
            return this._http.put<MyResponse>('/api/CAType/update', caType);
        } else {
            return this._http.post<MyResponse>('/api/CAType/add', caType);
        }
    }

    public DeleteCAType(caType: CAType): Observable<MyResponse> {
        return this._http.put<MyResponse>(`/api/CAType/delete`, caType);
    }
}
