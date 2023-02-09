import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import { iTasksRoutingModule } from './iTasks-routing.module';
import { ITasksComponent } from './i-tasks.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';

@NgModule({
    declarations: [ITasksComponent, MyTasksComponent],
    imports: [
        CommonModule,
        iTasksRoutingModule,
        CardModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputTextareaModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        ConfirmPopupModule,
        DialogModule,
        InputTextModule,
        ProgressBarModule,
        RippleModule,
        BadgeModule,
    ],
})
export class iTasksModule {}
