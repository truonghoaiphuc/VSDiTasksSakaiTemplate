import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitlesComponent } from './titles.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: TitlesComponent,
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class TitlesRoutingModule {}
