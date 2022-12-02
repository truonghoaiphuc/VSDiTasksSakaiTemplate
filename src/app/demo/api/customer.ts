export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    activity?: number;
    representative?: Representative;
}

export interface Department {
    name?: string;
    code?: string;
}

export interface User {
    id?: number;
    username?: string;
    fullname?: string;
    department?: Department;
    address?: string;
    phonenumber?: string;
    email?: string;
    title?: string;
    gender?: boolean;
    birthday?: Date;
    createddate?: Date;
    status?: string;
    avatar?: string;
}
