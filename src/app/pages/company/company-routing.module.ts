import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleComponent } from '../title/title.component';
import { CompanyComponent } from './company.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: CompanyComponent,
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class CompanyRoutingModule {}
