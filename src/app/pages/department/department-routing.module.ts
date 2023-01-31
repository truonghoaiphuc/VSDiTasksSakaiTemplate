import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartmentComponent } from './department.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DepartmentComponent,
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class DepartmentRoutingModule {}
