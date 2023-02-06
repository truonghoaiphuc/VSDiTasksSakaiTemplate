import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CAType } from 'src/app/Models/catype.model';
import { MyResponse } from 'src/app/Models/myresponse.model';
import { CaTypeService } from 'src/app/Services/ca-type.service';
@Component({
    selector: 'app-addedit-catype',
    templateUrl: './addedit-catype.component.html',
    styleUrls: ['./addedit-catype.component.scss'],
})
export class AddeditCATypeComponent implements OnChanges {
    @Input() displayAddModal: boolean = true;
    @Input() modalType: string = 'Add';
    @Input() catype: any = null;
    @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

    formCreate!: FormGroup;

    headerCaption: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private caTypeService: CaTypeService
    ) {
        this.initForm();
    }

    ngOnChanges(): void {
        this.headerCaption =
            this.modalType == 'Add'
                ? 'Thêm mới loại quyền'
                : 'Cập nhật thông tin loại quyền';
        if (this.catype) {
            this.formCreate.patchValue(this.catype);
        } else {
            this.formCreate.reset();
        }
    }

    initForm() {
        this.formCreate = this.formBuilder.group({
            caName: ['', [Validators.required]],
            description: [''],
        });
    }
    onSubmit() {
        if (this.formCreate.valid) {
            this.caTypeService
                .CreateOrEditCAType(
                    this.formCreate.value as CAType,
                    this.catype
                )
                .subscribe(
                    (result: MyResponse) => {
                        this.clickAdd.emit(result);
                        if (result.success) {
                            this.closeModal();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: 'Thêm loại quyền thành công',
                            });
                        }
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Thất bại',
                            detail: 'Thêm loại quyền không thành công',
                        });
                    }
                );
        }
    }

    closeModal() {
        this.formCreate.reset();
        this.clickClose.emit(true);
    }
}
