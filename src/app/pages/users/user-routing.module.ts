import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UsercreateComponent } from './usercreate/usercreate.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserupdateComponent } from './userupdate/userupdate.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: UserComponent,
            },
            {
                path: ':id',
                component: UserdetailComponent,
            },
            {
                path: ':id/edit',
                component: UserupdateComponent,
            },
            {
                path: ':create',
                component: UsercreateComponent,
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class UserRoutingModule {}
