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
import {
    concatMap,
    map,
    mapTo,
    mergeMap,
    Observable,
    share,
    shareReplay,
    Subject,
    switchMap,
    tap,
} from 'rxjs';
import { UserListState, USER_LIST_STATE } from '../states/UserListState.state';
import { UserInfo, UserStatus } from 'src/app/Models/user.model';
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

    statuses: any[] = [];

    refresh$ = new Subject<void>();
    onRefreshHandler$ = new Subject<void>();

    @ViewChild('filter') filter!: ElementRef;

    displayAddEditModal: boolean = false;
    displayDetailModal: boolean = false;
    usDetail!: UserInfo;
    us: any = null;

    modalType: string = 'Add';

    get userListState$(): Observable<UserListState> {
        return this.userListState.select();
    }

    get users$(): Observable<any[] | [] | null> {
        return this.userListState.select('users').pipe(shareReplay(1));
    }

    get loading$(): Observable<boolean> {
        return this.userListState.select('loading');
    }

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private userService: UserService,
        private userListState: RxState<UserListState>
    ) {}

    private connectstate(): void {
        // this.userListState.set({loading:true});
        const handler$ = this.onRefreshHandler$.pipe(
            switchMap(() =>
                this.userService
                    .GetAllUsers()
                    .pipe(tap(() => this.userListState.set({ loading: true })))
            )
        );
        this.userListState.connect(handler$, (_, curr) => ({
            users: curr,
            loading: false,
        }));
    }

    private manageEvents(): void {
        this.userListState.hold(this.refresh$, () => {
            this.onRefreshHandler$.next();
            this.userListState.set({ loading: true });
        });
    }

    hideAddEditModal(isClosed: boolean) {
        this.displayAddEditModal = !isClosed;
    }

    hideDetailModal(isClosed: boolean) {
        this.displayDetailModal = !isClosed;
    }

    showDetailModal(us: any) {
        this.us = us;
        this.displayDetailModal = true;
    }

    showAddModal() {
        this.displayAddEditModal = true;
        this.modalType = 'Add';
        this.us = null;
    }
    showUpdateModal(us: any) {
        this.us = us;
        this.modalType = 'Edit';
        this.displayAddEditModal = true;
    }

    ngOnInit() {
        this.manageEvents();
        this.connectstate();
        this.refresh$.next();
    }

    AddUser(res: any) {
        this.refresh$.next();
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
                            this.refresh$.next();
                        }
                    });
            },
        });
    }

    confirmActive(event: Event, us: UserInfo) {
        this.confirmationService.confirm({
            key: 'confirmDelete',
            target: event.target || new EventTarget(),
            message: `Bạn muốn ${
                us.status === UserStatus.ACTIVE ? 'khóa' : 'kích hoạt'
            } người dùng ${us.userName}?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                console.log('active thành công');
                this.userService
                    .ActiveUser(us.id)
                    .subscribe((result: MyResponse) => {
                        if (result.success) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: `Bạn đã ${
                                    us.status === UserStatus.ACTIVE
                                        ? 'khóa'
                                        : 'kích hoạt'
                                } người dùng ${us.userName}?`,
                            });
                            this.refresh$.next();
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Thất bại',
                                detail: `Không thể ${
                                    us.status === UserStatus.ACTIVE
                                        ? 'khóa'
                                        : 'kích hoạt'
                                } người dùng ${us.userName}!`,
                            });
                        }
                    });
            },
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
