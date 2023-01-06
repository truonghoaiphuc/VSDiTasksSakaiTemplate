import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/app/Models/user.model';
import { AuthenService } from 'src/app/Services/authen.service';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];
    menuItems: MenuItem[] = [];
    loggedInUser!: any;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private authenService: AuthenService
    ) {
        this.authenService.getCurrentUser().subscribe((us) => {
            this.loggedInUser = us;
        });
        this.menuItems = [
            {
                label: 'Đổi mật khẩu',
                icon: 'pi pi-fw pi-check',
            },
            {
                label: 'Thay đổi hình đại diện',
                icon: 'pi pi-fw pi-refresh',
            },
            {
                separator: true,
            },
            {
                label: 'Đăng xuất',
                icon: 'pi pi-sign-out',
            },
        ];
    }
}
