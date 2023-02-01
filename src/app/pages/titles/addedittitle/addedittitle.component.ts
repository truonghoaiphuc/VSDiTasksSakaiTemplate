import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MyResponse } from 'src/app/Models/myresponse.model';
import { Title } from 'src/app/Models/title.model';
import { TitleService } from 'src/app/Services/title.service';

@Component({
    selector: 'app-addedittitle',
    templateUrl: './addedittitle.component.html',
    styleUrls: ['./addedittitle.component.scss'],
})
export class AddEditTitleComponent implements OnChanges {
    @Input() displayAddModal: boolean = true;
    @Input() modalType: string = 'Add';
    @Input() title: any = null;
    @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

    formCreate!: FormGroup;

    headerCaption: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private titleService: TitleService
    ) {
        this.initForm();
    }

    ngOnChanges(): void {
        this.headerCaption =
            this.modalType == 'Add'
                ? 'Thêm mới Chức danh'
                : 'Cập nhật thông tin chức danh';
        if (this.title) {
            this.formCreate.patchValue(this.title);
        } else {
            this.formCreate.reset();
        }
    }

    initForm() {
        this.formCreate = this.formBuilder.group({
            titleId: ['', [Validators.required]],
            titleName: ['', [Validators.required]],
            description: [''],
        });
    }
    onSubmit() {
        if (this.formCreate.valid) {
            this.titleService
                .CreateOrEditTitle(this.formCreate.value as Title, this.title)
                .subscribe(
                    (result: MyResponse) => {
                        this.clickAdd.emit(result);
                        if (result.success) {
                            this.closeModal();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: 'Thêm chức danh thành công',
                            });
                        }
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Thất bại',
                            detail: 'Thêm chức danh không thành công',
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
