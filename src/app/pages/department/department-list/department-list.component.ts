import { Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { Department } from 'src/app/Models/department.model';
import { MyResponse } from 'src/app/Models/myresponse.model';
import { DepartmentService } from 'src/app/Services/department.service';
import { DepartmentListState } from '../states';

type NewType = ConfirmationService;

@Component({
    selector: 'app-department-list',
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.scss'],
    providers: [MessageService, ConfirmationService, RxState],
})
export class DepartmentListComponent implements OnInit {
    displayAddEditModal: boolean = false;
    displayDetailModal: boolean = false;
    department: any = null;

    modalType: string = 'Add';

    refresh$ = new Subject<void>();
    onRefreshHandler$ = new Subject<void>();

    get departments$(): Observable<Department[]> {
        return this.deptListState.select('departments').pipe(shareReplay(1));
    }

    get loading$(): Observable<boolean> {
        return this.deptListState.select('loading');
    }

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private deptService: DepartmentService,
        private deptListState: RxState<DepartmentListState>
    ) {}

    private connectState(): void {
        const handler$ = this.onRefreshHandler$.pipe(
            switchMap(() =>
                this.deptService
                    .GetDepts()
                    .pipe(tap(() => this.deptListState.set({ loading: true })))
            )
        );
        this.deptListState.connect(handler$, (prev, curr) => ({
            ...prev,
            departments: curr,
            loading: false,
        }));
    }

    private manageEvent(): void {
        this.deptListState.hold(this.refresh$, () => {
            this.onRefreshHandler$.next();
            this.deptListState.set({ loading: true });
        });
    }

    hideAddEditModal(isClosed: boolean) {
        this.displayAddEditModal = !isClosed;
    }

    showAddModal() {
        this.displayAddEditModal = true;
        this.modalType = 'Add';
        this.department = null;
    }
    showUpdateModal(rl: any) {
        this.department = rl;
        this.modalType = 'Edit';
        this.displayAddEditModal = true;
    }

    ngOnInit() {
        this.manageEvent();
        this.connectState();
        this.refresh$.next();
    }

    AddDepartment(res: any) {
        this.refresh$.next();
    }
    //write a function using rxstate in angular
    confirmDelete(event: Event, dept: Department) {
        this.confirmationService.confirm({
            key: 'confirmDelete',
            target: event.target || new EventTarget(),
            message: `Bạn muốn xóa ${dept.deptName}?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deptService
                    .DeleteDepartment(dept)
                    .subscribe((result: MyResponse) => {
                        if (result.success) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: `Bạn đã xóa thành công ${dept.deptName}`,
                            });
                            this.refresh$.next();
                        }
                    });
            },
        });
    }
}
