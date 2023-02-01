import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AuthGuard } from './Guards/auth.guard';
import { LoginComponent } from './layout/unauthorized/login/login.component';
import { AppLayoutComponent } from './layout/authorized/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    canActivate: [AuthGuard],
                    children: [
                        {
                            path: 'dashboard',
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'uikit',
                            loadChildren: () =>
                                import(
                                    './demo/components/uikit/uikit.module'
                                ).then((m) => m.UIkitModule),
                        },
                        {
                            path: 'utilities',
                            loadChildren: () =>
                                import(
                                    './demo/components/utilities/utilities.module'
                                ).then((m) => m.UtilitiesModule),
                        },
                        {
                            path: 'documentation',
                            loadChildren: () =>
                                import(
                                    './demo/components/documentation/documentation.module'
                                ).then((m) => m.DocumentationModule),
                        },
                        {
                            path: 'blocks',
                            loadChildren: () =>
                                import(
                                    './demo/components/primeblocks/primeblocks.module'
                                ).then((m) => m.PrimeBlocksModule),
                        },
                        {
                            path: 'pages',
                            loadChildren: () =>
                                import(
                                    './demo/components/pages/pages.module'
                                ).then((m) => m.PagesModule),
                        },
                        {
                            path: 'users',
                            loadChildren: () =>
                                import('./pages/users/users.module').then(
                                    (m) => m.UsersModule
                                ),
                        },
                        {
                            path: 'roles',
                            loadChildren: () =>
                                import('./pages/role/role.module').then(
                                    (m) => m.RoleModule
                                ),
                        },
                        {
                            path: 'companies',
                            loadChildren: () =>
                                import('./pages/company/company.module').then(
                                    (m) => m.CompanyModule
                                ),
                        },
                        {
                            path: 'departments',
                            loadChildren: () =>
                                import(
                                    './pages/department/department.module'
                                ).then((m) => m.DepartmentModule),
                        },
                        {
                            path: 'titles',
                            loadChildren: () =>
                                import('./pages/titles/titles.module').then(
                                    (m) => m.TitlesModule
                                ),
                        },
                    ],
                },
                {
                    path: 'login',
                    component: LoginComponent,
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                {
                    path: 'landing',
                    loadChildren: () =>
                        import('./demo/components/landing/landing.module').then(
                            (m) => m.LandingModule
                        ),
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
