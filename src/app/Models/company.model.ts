import { Department } from './department.model';

export interface Company {
    compCode: string;
    compName: string;
    compAddress: string;
    depts: Department[];
}
