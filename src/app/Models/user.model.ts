export interface CurrentUser {
    userName: string;
    fullName: string;
    role: string;
}

export interface UserInfo {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    gender: boolean;
    avatar: string;
    deptId: string;
    deptName: string;
    roleId: string;
    roleName: string;
    title: string;
    titleName: string;
    dateOfBirth: Date;
    status: UserStatus;
    updateDate: Date;
    updateId?: string;
    createdDate: Date;
    createdId?: string;
}

export enum UserStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    BANNED = 2,
}
