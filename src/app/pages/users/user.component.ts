import { Component, OnInit, Inject } from '@angular/core';
import { RoleService } from 'src/app/Services/role.service';
import { RxState } from '@rx-angular/state';
import { UserPageState, USER_PAGE_STATE } from './states';
import { UserService } from 'src/app/Services/user.service';
import { CompanyService } from 'src/app/Services/company.service';
import { TitleService } from 'src/app/Services/title.service';

@Component({
    selector: 'app-users',
    templateUrl: './user.component.html',
    // styleUrls: ['./userlist.component.scss'],
    providers: [RxState],
})
export class UserComponent {
    constructor(
        private roleService: RoleService,
        private userService: UserService,
        private compService: CompanyService,
        private titleService: TitleService,
        @Inject(USER_PAGE_STATE)
        private userPageState: RxState<UserPageState>
    ) {
        userPageState.connect(roleService.GetRoles(), (_, curr) => ({
            roles: curr,
        }));
        userPageState.connect(titleService.GetTitles(), (_, curr) => ({
            titles: curr,
        }));
        userPageState.connect(compService.GetCompanyAll(), (_, curr) => ({
            depts: curr,
        }));
    }
}
