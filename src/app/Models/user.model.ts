export interface CurrentUser {
    userName: string;
    fullName: string;
    role: string;
}

export interface UserInfo {
    userName: string;
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
    updateDate: Date;
    updateId?: string;
    createdDate: Date;
    createdId?: string;
}
