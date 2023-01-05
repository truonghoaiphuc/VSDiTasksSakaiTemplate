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
import { Observable, share, shareReplay, switchMap } from 'rxjs';
import { UserListState, USER_LIST_STATE } from '../states/UserListState.state';
import { UserInfo } from 'src/app/Models/user.model';
import { MyResponse } from 'src/app/Models/myresponse.model';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    // styleUrls: ['./userlist.component.scss'],
    providers: [MessageService, ConfirmationService, RxState],
})
export class UserlistComponent implements OnInit {
    users: UserInfo[] = [];

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
    displayDetailModal: boolean = false;
    displayUpdateModal: boolean = false;
    usDetail!: UserInfo;
    us: any = null;

    modalType: string = 'Add';

    get users$(): Observable<UserInfo[]> {
        return this.userListState.select('users').pipe(shareReplay(1));
    }

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private userService: UserService,
        private userListState: RxState<UserListState>
    ) {
        userListState.connect(userService.GetAllUsers(), (_, curr) => ({
            users: curr,
        }));
    }

    hideAddModal(isClosed: boolean) {
        this.display = !isClosed;
    }

    hideDetailModal(isClosed: boolean) {
        this.displayDetailModal = !isClosed;
    }

    hideUpdateModal(isClosed: boolean) {
        this.displayUpdateModal = !isClosed;
    }

    showDetailModal(us: any) {
        this.us = us;
        this.displayDetailModal = true;
    }

    showUpdateModal(us: any) {
        this.us = us;
        this.modalType = 'Edit';
        this.display = true;
    }

    ngOnInit() {
        this.users$.subscribe((data) => {
            this.users = data;
            this.loading = false;
        });
    }

    LoadUser() {
        this.loading = true;
        this.userListState.connect(
            this.userService.GetAllUsers(),
            (_, curr) => ({
                users: curr,
            })
        );
        this.loading = false;
    }

    AddUser(res: any) {
        this.LoadUser();
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
