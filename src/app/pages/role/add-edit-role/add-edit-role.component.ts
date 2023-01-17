import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    Inject,
    OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Checkbox } from 'primeng/checkbox';
import { MyResponse } from 'src/app/Models/myresponse.model';
import { Role } from 'src/app/Models/role.model';
import { RoleService } from 'src/app/Services/role.service';

@Component({
    selector: 'app-add-edit-role',
    templateUrl: './add-edit-role.component.html',
    styleUrls: ['./add-edit-role.component.scss'],
})
export class AddEditRoleComponent implements OnInit, OnChanges {
    @Input() displayAddModal: boolean = true;
    @Input() modalType: string = 'Add';
    @Input() role: any = null;
    @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

    formCreate!: FormGroup;

    headerCaption: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private roleService: RoleService
    ) {
        this.initForm();
    }

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.headerCaption =
            this.modalType == 'Add'
                ? 'Thêm mới nhóm người dùng'
                : 'Cập nhật thông tin nhóm người dùng';
        if (this.role) {
            this.formCreate.patchValue(this.role);
        } else {
            this.formCreate.reset();
            //   this.formCreate.controls["isAdmin"].setValue(false);
        }
    }

    initForm() {
        this.formCreate = this.formBuilder.group({
            roleId: ['', [Validators.required]],
            roleName: ['', [Validators.required]],
            isAdmin: [false, [Validators.required]],
            description: [''],
        });
    }
    onSubmit() {
        if (this.formCreate.valid) {
            console.log(this.formCreate.value);
            this.roleService
                .CreateOrEditRole(this.formCreate.value as Role, this.role)
                .subscribe(
                    (result: MyResponse) => {
                        this.clickAdd.emit(result);
                        if (result.success) {
                            this.closeModal();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: 'Thêm nhóm người dùng thành công',
                            });
                        }
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Thất bại',
                            detail: 'Thêm nhóm người dùng không thành công',
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
