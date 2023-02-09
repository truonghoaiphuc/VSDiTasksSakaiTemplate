import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ITasksComponent } from './i-tasks.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ITasksComponent,
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class iTasksRoutingModule {}
