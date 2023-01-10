import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';
import { RoleListComponent } from './role-list/role-list.component';



@NgModule({
  declarations: [
    AddEditRoleComponent,
    RoleListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RoleModule { }
