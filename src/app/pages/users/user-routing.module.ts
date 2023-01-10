import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: UserComponent,
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
export class UserRoutingModule {}
