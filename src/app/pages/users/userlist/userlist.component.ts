import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Inject,
} from '@angular/core';
import { Customer, Representative, User } from 'src/app/demo/api/customer';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UserService } from 'src/app/Services/user.service';
import { RxState } from '@rx-angular/state';
import { UserPageState, USER_PAGE_STATE } from '../states/UserPageState.state';
import { Role } from 'src/app/Models/role.model';
import { Observable, share, shareReplay, switchMap } from 'rxjs';
import { UserListState, USER_LIST_STATE } from '../states/UserListState.state';
import { UserInfo } from 'src/app/Models/user.model';
import { DepartmentService } from 'src/app/Services/department.service';
import { Department } from 'src/app/Models/department.model';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { userInfo } from 'os';
import { MyResponse } from 'src/app/Models/myresponse.model';

interface expandedRows {
    [key: string]: boolean;
}

enum UserStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    BANNED = 2,
}

@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    // styleUrls: ['./userlist.component.scss'],
    providers: [MessageService, ConfirmationService, RxState],
})
export class UserlistComponent implements OnInit {
    users: User[] = [];
    usroles: Role[] = [];

    customers1: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    display: boolean = false;

    uploadedFiles: any[] = [];

    formCreate!: FormGroup;
    genders: any[] = [];

    get roles$(): Observable<Role[]> {
        return this.userPageState.select('roles').pipe(shareReplay(1));
    }

    get titles$(): Observable<any[]> {
        return this.userPageState.select('titles').pipe(shareReplay(1));
    }
    get depts$(): Observable<any[]> {
        return this.userListState.select('depts').pipe(shareReplay(1));
    }

    get users$(): Observable<UserInfo[]> {
        return this.userListState.select('users').pipe(shareReplay(1));
    }

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private userService: UserService,
        private deptService: DepartmentService,
        private formBuilder: FormBuilder,
        @Inject(USER_PAGE_STATE)
        private userPageState: RxState<UserPageState>,
        private userListState: RxState<UserListState>
    ) {
        userListState.connect(userService.GetAllUsers(), (_, curr) => ({
            users: curr,
        }));
        userListState.connect(deptService.GetDepts(), (_, curr) => ({
            depts: curr,
        }));
    }

    initForm() {
        this.formCreate = this.formBuilder.group({
            userName: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            password: ['', [Validators.required]],
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

    resetForm() {
        this.formCreate.controls['userName'].setValue('');
        this.formCreate.controls['firstName'].setValue('');
        this.formCreate.controls['lastName'].setValue('');
        this.formCreate.controls['password'].setValue('');
        this.formCreate.controls['dateOfBirth'].setValue('');
        this.formCreate.controls['email'].setValue('');
        this.formCreate.controls['phoneNumber'].setValue('');
        this.formCreate.controls['address'].setValue('');
    }

    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded',
        });
    }

    ngOnInit() {
        this.users$.subscribe((data) => {
            this.users = data;
            this.loading = false;
        });
        this.genders = [
            { label: 'Nam', value: false },
            { label: 'Nữ', value: true },
        ];
        this.initForm();
    }

    onSubmit() {
        this.userService
            .CreateUser(this.formCreate.value)
            .subscribe((result: MyResponse) => {
                console.log(result);
                if (result.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Thêm người dùng thành công',
                    });
                    this.resetForm();
                    this.display = false;
                    this.userListState.connect(
                        this.userService.GetAllUsers(),
                        (_, curr) => ({
                            users: curr,
                        })
                    );
                }
            });
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers1) {
            for (let i = 0; i < this.customers1.length; i++) {
                const rowData = this.customers1[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = {
                        index: 0,
                        size: 1,
                    };
                } else {
                    const previousRowData = this.customers1[i - 1];
                    const previousRowGroup =
                        previousRowData?.representative?.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    } else {
                        this.rowGroupMetadata[representativeName] = {
                            index: i,
                            size: 1,
                        };
                    }
                }
            }
        }
    }

    confirmDelete(event: Event, id: number, usname: string) {
        this.confirmationService.confirm({
            key: 'confirmDelete',
            target: event.target || new EventTarget(),
            message: `Bạn muốn xóa người dùng ${usname}?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userService
                    .DeleteUser(id)
                    .subscribe((result: MyResponse) => {
                        if (result.success) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: `Bạn đã xóa thành công người dùng ${usname} có id=${id}`,
                            });
                            this.userListState.connect(
                                this.userService.GetAllUsers(),
                                (_, curr) => ({
                                    users: curr,
                                })
                            );
                        }
                    });
            },
        });
    }

    formatCurrency(value: number) {
        return value.toLocaleString('vn-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
