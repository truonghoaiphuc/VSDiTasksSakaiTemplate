import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { CompanyListComponent } from './company-list/company-list.component';
import { AddeditcompanyComponent } from './addeditcompany/addeditcompany.component';
import { CompanyComponent } from './company.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    declarations: [
        CompanyListComponent,
        AddeditcompanyComponent,
        CompanyComponent,
    ],
    imports: [
        CommonModule,
        CompanyRoutingModule,
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
export class CompanyModule {}
