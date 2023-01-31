import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../Models/company.model';
import { MyResponse } from '../Models/myresponse.model';

@Injectable({
    providedIn: 'root',
})
export class CompanyService {
    loggedInUser!: any;
    constructor(private _http: HttpClient) {}

    public GetCompanies(): Observable<Company[]> {
        return this._http.get<any>('/api/Company');
    }

    public GetCompanyAll(): Observable<Company[]> {
        return this._http.get<any>('/api/Company/all');
    }

    public CreateOrEditCompany(
        company: Company,
        editcompany: Company
    ): Observable<MyResponse> {
        if (editcompany) {
            company.compCode = editcompany.compCode;
            return this._http.put<MyResponse>('/api/Company/update', company);
        } else {
            return this._http.post<MyResponse>('/api/Company/add', company);
        }
    }

    public DeleteCompany(company: Company): Observable<MyResponse> {
        return this._http.put<MyResponse>(
            `/api/Company/delete?code=${company.compCode}`,
            company
        );
    }
}
