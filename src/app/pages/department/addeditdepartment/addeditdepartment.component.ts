import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Department } from 'src/app/Models/department.model';
import { MyResponse } from 'src/app/Models/myresponse.model';
import { DepartmentService } from 'src/app/Services/department.service';

@Component({
    selector: 'app-addeditdepartment',
    templateUrl: './addeditdepartment.component.html',
    styleUrls: ['./addeditdepartment.component.scss'],
})
export class AddeditdepartmentComponent implements OnChanges {
    @Input() displayAddModal: boolean = true;
    @Input() modalType: string = 'Add';
    @Input() department: any = null;
    @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

    formCreate!: FormGroup;

    headerCaption: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private deptService: DepartmentService
    ) {
        this.initForm();
    }

    ngOnChanges(): void {
        this.headerCaption =
            this.modalType == 'Add'
                ? 'Thêm mới Công ty'
                : 'Cập nhật thông tin Công ty';
        if (this.department) {
            this.formCreate.patchValue(this.department);
        } else {
            this.formCreate.reset();
        }
    }

    initForm() {
        this.formCreate = this.formBuilder.group({
            deptCode: ['', [Validators.required]],
            deptName: ['', [Validators.required]],
            branch: ['', [Validators.required]],
        });
    }
    onSubmit() {
        if (this.formCreate.valid) {
            this.deptService
                .CreateOrEditDepartment(
                    this.formCreate.value as Department,
                    this.department
                )
                .subscribe(
                    (result: MyResponse) => {
                        this.clickAdd.emit(result);
                        if (result.success) {
                            this.closeModal();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: 'Thêm Phòng ban thành công',
                            });
                        }
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Thất bại',
                            detail: 'Thêm Phòng ban không thành công',
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
