import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from './userlist/userlist.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UsercreateComponent } from './usercreate/usercreate.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputMaskModule } from 'primeng/inputmask';
import { UserPageState, USER_PAGE_STATE } from './states/UserPageState.state';
import { RxState } from '@rx-angular/state';
import { UserComponent } from './user.component';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
    declarations: [
        UserComponent,
        UserlistComponent,
        UserdetailComponent,
        UsercreateComponent,
        UserupdateComponent,
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        FileUploadModule,
        DialogModule,
        ConfirmPopupModule,
        InputMaskModule,
        CalendarModule,
        PasswordModule,
        ToastModule,
        AvatarModule,
    ],
    providers: [
        {
            provide: USER_PAGE_STATE,
            useFactory: () => new RxState<UserPageState>(),
        },
    ],
})
export class UsersModule {}
