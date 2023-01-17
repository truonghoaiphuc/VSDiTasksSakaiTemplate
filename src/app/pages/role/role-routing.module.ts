import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleAccessListComponent } from './role-access-list/role-access-list.component';
import { RoleComponent } from './role.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: RoleComponent,
            },
            {
                path: ':id',
                component: RoleAccessListComponent,
            },
            // {
            //     path: ':id',
            //     component: UserdetailComponent,
            // },
            // {
            //     path: ':create',
            //     component: UsercreateComponent,
            // },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class RoleRoutingModule {}
