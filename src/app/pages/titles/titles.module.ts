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
import { TitlesRoutingModule } from './titles-routing.module';
import { TitlesComponent } from './titles.component';
import { TitlesListComponent } from './titles-list/titles-list.component';
import { AddEditTitleComponent } from './addedittitle/addedittitle.component';

@NgModule({
    declarations: [TitlesComponent, TitlesListComponent, AddEditTitleComponent],
    imports: [
        CommonModule,
        TitlesRoutingModule,
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
export class TitlesModule {}
