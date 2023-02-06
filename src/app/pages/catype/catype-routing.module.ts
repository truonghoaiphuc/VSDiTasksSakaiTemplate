import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CATypeComponent } from './catype.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: CATypeComponent,
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class CATypeRoutingModule {}
