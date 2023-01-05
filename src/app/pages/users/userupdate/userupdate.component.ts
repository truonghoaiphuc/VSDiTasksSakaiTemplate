import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxState } from '@rx-angular/state';
import { MessageService } from 'primeng/api';
import { Observable, shareReplay } from 'rxjs';
import { MyResponse } from 'src/app/Models/myresponse.model';
import { Role } from 'src/app/Models/role.model';
import { UserInfo } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { UserPageState, USER_PAGE_STATE } from '../states';

@Component({
    selector: 'app-userupdate',
    templateUrl: './userupdate.component.html',
    styleUrls: ['./userupdate.component.scss'],
    providers: [MessageService, RxState],
})
export class UserupdateComponent implements OnInit, OnChanges {
    @Input() displayUpdateModal: boolean = true;
    @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() user: any = null;

    uploadedFiles: any[] = [];

    formUpdate!: FormGroup;
    genders: any[] = [];

    usAvatar: string = '';

    get roles$(): Observable<Role[]> {
        return this.userPageState.select('roles').pipe(shareReplay(1));
    }

    get titles$(): Observable<any[]> {
        return this.userPageState.select('titles').pipe(shareReplay(1));
    }
    get depts$(): Observable<any[]> {
        return this.userPageState.select('depts').pipe(shareReplay(1));
    }

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private userService: UserService,
        @Inject(USER_PAGE_STATE)
        private userPageState: RxState<UserPageState>
    ) {}

    ngOnInit(): void {
        this.genders = [
            { label: 'Nam', value: false },
            { label: 'Nữ', value: true },
        ];
        this.initForm();
    }
    initForm() {
        this.formUpdate = this.formBuilder.group({
            userName: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            dateOfBirth: ['', [Validators.required]],
            gender: [false, [Validators.required]],
            email: [''],
            phoneNumber: [''],
            address: [''],
            deptId: ['', [Validators.required]],
            titleId: ['', [Validators.required]],
            roleId: ['', [Validators.required]],
        });
    }
    ngOnChanges(): void {
        if (this.user) {
            console.log(this.user);
            this.formUpdate.patchValue(this.user);
            const dob = new Date(this.user.dateOfBirth);
            this.formUpdate.controls['dateOfBirth'].setValue(dob);
            this.usAvatar = this.user.avatar;
        }
    }

    closeModal() {
        this.clickClose.emit(true);
    }

    public onUpload(event: any, fileUpload: any) {
        for (let file of event.files) {
            this.processFile(file);
        }
        fileUpload.clear();
    }

    public readFileAsync(file: File) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    public arrayBufferToString(arrayBuffer: any, decoderType = 'utf-8') {
        let decoder = new TextDecoder(decoderType);
        return decoder.decode(arrayBuffer);
    }

    public arrayBufferToBase64(buffer: ArrayBuffer): string {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i <= len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    public async processFile(file: File) {
        try {
            let arrayBuffer = await this.readFileAsync(file);
            const dataBase64 = this.arrayBufferToBase64(
                arrayBuffer as ArrayBuffer
            );
            this.usAvatar = 'data:image/jpg;base64,' + dataBase64;
        } catch (error) {}
    }

    onSubmit() {
        if (this.formUpdate.valid) {
            this.userService
                .CreateOrEditUser(
                    this.formUpdate.value as UserInfo,
                    this.usAvatar,
                    this.user
                )
                .subscribe(
                    (result: MyResponse) => {
                        if (result.success) {
                            this.closeModal();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: 'Cập nhật thông tin người dùng thành công',
                            });
                        }
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Thất bại',
                            detail: 'Cập nhật thông tin người dùng không thành công',
                        });
                    }
                );
        }
    }
}
