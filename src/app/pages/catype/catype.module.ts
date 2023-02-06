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
import { CATypeRoutingModule } from './catype-routing.module';
import { CATypeComponent } from './catype.component';
import { CATypeListComponent } from './catype-list/catype-list.component';
import { AddeditCATypeComponent } from './addedit-catype/addedit-catype.component';

@NgModule({
    declarations: [
        CATypeComponent,
        CATypeListComponent,
        AddeditCATypeComponent,
    ],
    imports: [
        CommonModule,
        CATypeRoutingModule,
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
export class CATypeModule {}
