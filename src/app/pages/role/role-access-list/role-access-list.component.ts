import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-role-access-list',
    templateUrl: './role-access-list.component.html',
    styleUrls: ['./role-access-list.component.scss'],
})
export class RoleAccessListComponent implements OnInit {
    @Input() role: any = '';
    constructor() {}

    ngOnInit(): void {}
}
