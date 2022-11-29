export class LoggedInUser {
    constructor(
        access_token: string,
        username: string,
        fullName: string,
        phong: string,
        title: string,
        email: string,
        avatar: string,
        roles: any,
        permissions: any
    ) {
        this.access_token = access_token;
        this.fullName = fullName;
        this.username = username;
        this.phong = phong;
        this.title = title;
        this.email = email;
        this.avatar = avatar;
        this.roles = roles;
        this.permissions = permissions;
    }
    // public id: string;
    public access_token: string;
    public username: string;
    public fullName: string;
    public phong: string;
    public title: string;
    public email: string;
    public avatar: string;
    public permissions: any;
    public roles: any;
}
