import { Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { Company } from 'src/app/Models/company.model';
import { MyResponse } from 'src/app/Models/myresponse.model';
import { CompanyService } from 'src/app/Services/company.service';
import { CompanyListState } from '../states';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss'],
    providers: [MessageService, ConfirmationService, RxState],
})
export class CompanyListComponent implements OnInit {
    displayAddEditModal: boolean = false;
    displayDetailModal: boolean = false;
    company: any = null;

    modalType: string = 'Add';

    refresh$ = new Subject<void>();
    onRefreshHandler$ = new Subject<void>();

    get companies$(): Observable<Company[]> {
        return this.compListState.select('companies').pipe(shareReplay(1));
    }

    get loading$(): Observable<boolean> {
        return this.compListState.select('loading');
    }

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private compService: CompanyService,
        private compListState: RxState<CompanyListState>
    ) {}

    private connectState(): void {
        const handler$ = this.onRefreshHandler$.pipe(
            switchMap(() =>
                this.compService
                    .GetCompanies()
                    .pipe(tap(() => this.compListState.set({ loading: true })))
            )
        );
        this.compListState.connect(handler$, (prev, curr) => ({
            ...prev,
            companies: curr,
            loading: false,
        }));
    }

    private manageEvent(): void {
        this.compListState.hold(this.refresh$, () => {
            this.onRefreshHandler$.next();
            this.compListState.set({ loading: true });
        });
    }

    hideAddEditModal(isClosed: boolean) {
        this.displayAddEditModal = !isClosed;
    }

    // hideDetailModal(isClosed: boolean) {
    //     this.displayDetailModal = !isClosed;
    // }

    // showDetailModal(rl: any) {
    //     this.company = rl;
    //     this.displayDetailModal = true;
    // }

    showAddModal() {
        this.displayAddEditModal = true;
        this.modalType = 'Add';
        this.company = null;
    }
    showUpdateModal(rl: any) {
        this.company = rl;
        this.modalType = 'Edit';
        this.displayAddEditModal = true;
    }

    ngOnInit() {
        this.manageEvent();
        this.connectState();
        this.refresh$.next();
    }

    AddCompany(res: any) {
        this.refresh$.next();
    }
    //write a function using rxstate in angular
    confirmDelete(event: Event, comp: Company) {
        this.confirmationService.confirm({
            key: 'confirmDelete',
            target: event.target || new EventTarget(),
            message: `Bạn muốn xóa công ty ${comp.compName}?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.compService
                    .DeleteCompany(comp)
                    .subscribe((result: MyResponse) => {
                        if (result.success) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: `Bạn đã xóa thành công ${comp.compName}`,
                            });
                            this.refresh$.next();
                        }
                    });
            },
        });
    }
}
