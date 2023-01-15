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
import {CheckboxModule} from 'primeng/checkbox';



@NgModule({
  declarations: [
    AddEditRoleComponent,
    RoleListComponent,
    RoleComponent
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
    CheckboxModule
  ]
})
export class RoleModule { }
