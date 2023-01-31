import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Company } from 'src/app/Models/company.model';
import { MyResponse } from 'src/app/Models/myresponse.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
    selector: 'app-addeditcompany',
    templateUrl: './addeditcompany.component.html',
    styleUrls: ['./addeditcompany.component.scss'],
})
export class AddeditcompanyComponent implements OnChanges {
    @Input() displayAddModal: boolean = true;
    @Input() modalType: string = 'Add';
    @Input() company: any = null;
    @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

    formCreate!: FormGroup;

    headerCaption: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private compService: CompanyService
    ) {
        this.initForm();
    }

    ngOnChanges(): void {
        this.headerCaption =
            this.modalType == 'Add'
                ? 'Thêm mới Công ty'
                : 'Cập nhật thông tin Công ty';
        if (this.company) {
            this.formCreate.patchValue(this.company);
        } else {
            this.formCreate.reset();
        }
    }

    initForm() {
        this.formCreate = this.formBuilder.group({
            compCode: ['', [Validators.required]],
            compName: ['', [Validators.required]],
            compAddress: [false, [Validators.required]],
            description: [''],
        });
    }
    onSubmit() {
        if (this.formCreate.valid) {
            this.compService
                .CreateOrEditCompany(
                    this.formCreate.value as Company,
                    this.company
                )
                .subscribe(
                    (result: MyResponse) => {
                        this.clickAdd.emit(result);
                        if (result.success) {
                            this.closeModal();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: 'Thêm Công ty thành công',
                            });
                        }
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Thất bại',
                            detail: 'Thêm Công ty không thành công',
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
