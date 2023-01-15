import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: RoleComponent,
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
