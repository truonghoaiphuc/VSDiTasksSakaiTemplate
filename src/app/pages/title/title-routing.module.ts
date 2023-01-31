import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './title.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: TitleComponent,
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class TitleRoutingModule {}
