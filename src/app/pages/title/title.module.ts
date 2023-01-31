import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddedittitleComponent } from './addedittitle/addedittitle.component';
import { TitleListComponent } from './title-list/title-list.component';
import { TitleRoutingModule } from './title-routing.module';
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

@NgModule({
    declarations: [AddedittitleComponent, TitleListComponent],
    imports: [
        CommonModule,
        TitleRoutingModule,
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
    ],
})
export class TitleModule {}
