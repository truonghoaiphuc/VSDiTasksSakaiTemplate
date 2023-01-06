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
import { RxState } from '@rx-angular/state';
import { MessageService } from 'primeng/api';
import { Observable, share, shareReplay, switchMap } from 'rxjs';
import { MyResponse } from 'src/app/Models/myresponse.model';
import { Role } from 'src/app/Models/role.model';
import { UserInfo } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { UserPageState, USER_PAGE_STATE } from '../states';

@Component({
    selector: 'app-usercreate',
    templateUrl: './usercreate.component.html',
    styleUrls: ['./usercreate.component.scss'],
    providers: [MessageService, RxState],
})
export class UsercreateComponent implements OnInit, OnChanges {
    @Input() displayAddModal: boolean = true;
    @Input() modalType: string = 'Add';
    @Input() user: any = null;
    @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

    formCreate!: FormGroup;
    usroles: Role[] = [];
    uploadedFiles: any[] = [];
    reader: FileReader | undefined;
    fileBuffer: any;
    progressPercent = 0;

    usAvatar: string = "assets/LOGO-VSD.png";

    genders: any[] = [];

    headerCaption: string = '';

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
    ) {
        this.initForm();
    }

    ngOnInit(): void {
        this.genders = [
            { label: 'Nam', value: false },
            { label: 'Nữ', value: true },
        ];
        this.reader = new FileReader();
        this.reader.onload = () => {
            this.fileBuffer = this.reader?.result;
        };        
    }

    ngOnChanges(): void {
        this.headerCaption =
            this.modalType == 'Add'
                ? 'Thêm mới người dùng'
                : 'Cập nhật thông tin người dùng';
                this.formCreate.controls["password"].clearValidators();
        if (this.user) {            
            this.formCreate.patchValue(this.user);
            const dob = new Date(this.user.dateOfBirth);
            this.formCreate.controls['dateOfBirth'].setValue(dob);
            this.usAvatar = this.user.avatar;                                    
        } else {
            this.formCreate.reset();
            this.formCreate.controls["password"].addValidators(Validators.required);
        }
    }

    initForm() {
        this.formCreate = this.formBuilder.group({
            userName: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            password: [''],
            cfPassword: [''],
            dateOfBirth: ['', [Validators.required]],
            gender: [false, [Validators.required]],
            email: [''],
            phoneNumber: [''],
            address: [''],
            deptId: ['', [Validators.required]],
            titleId: ['', [Validators.required]],
            roleId: ['', [Validators.required]],
            createdId: ['phucth'],
        });
    }

    public async onUpload(event: any, fileUpload: any) {
        for (let file of event.files) {
            await this.processFile(file);
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
        if (this.formCreate.valid) {
            this.userService
                    .CreateOrEditUser(
                        this.formCreate.value as UserInfo,
                        this.usAvatar,
                        this.user
                    )
                    .subscribe(
                        (result: MyResponse) => {
                            this.clickAdd.emit(result);
                            if (result.success) {
                                this.closeModal();
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Thành công',
                                    detail: 'Thêm người dùng thành công',
                                });
                            }
                        },
                        (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Thất bại',
                                detail: 'Thêm người dùng không thành công',
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
