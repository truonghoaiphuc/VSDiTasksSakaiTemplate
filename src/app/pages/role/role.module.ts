import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleComponent } from './role.component';
import { RoleRoutingModule } from './role-routing.module';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { RoleAccessListComponent } from './role-access-list/role-access-list.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
    declarations: [
        AddEditRoleComponent,
        RoleListComponent,
        RoleComponent,
        RoleAccessListComponent,
    ],
    imports: [
        CommonModule,
        RoleRoutingModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        ConfirmPopupModule,
        DialogModule,
        InputTextModule,
        InputSwitchModule,
        CheckboxModule,
        ProgressBarModule,
        RippleModule,
        ToolbarModule,
        InputTextareaModule,
        DropdownModule,
        InputNumberModule,
    ],
})
export class RoleModule {}
