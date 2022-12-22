import { Component, OnInit, Inject } from '@angular/core';
import { RoleService } from 'src/app/Services/role.service';
import { RxState } from '@rx-angular/state';
import { UserPageState, USER_PAGE_STATE } from './states';
import { UserService } from 'src/app/Services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './user.component.html',
    // styleUrls: ['./userlist.component.scss'],
    providers: [RxState],
})
export class UserComponent implements OnInit {
    constructor(
        private roleService: RoleService,
        private userService: UserService,
        @Inject(USER_PAGE_STATE)
        private userPageState: RxState<UserPageState>
    ) {
        userPageState.connect(roleService.GetRoles(), (_, curr) => ({
            roles: curr,
        }));
        userPageState.connect(userService.GetTitles(), (_, curr) => ({
            titles: curr,
        }));
    }

    ngOnInit(): void {}
}
