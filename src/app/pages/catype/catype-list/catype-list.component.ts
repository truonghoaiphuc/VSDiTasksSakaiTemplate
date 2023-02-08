import { Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
    Observable,
    shareReplay,
    Subject,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs';
import { CAType } from 'src/app/Models/catype.model';
import { MyResponse } from 'src/app/Models/myresponse.model';
import { CaTypeService } from 'src/app/Services/ca-type.service';
import { CATypeListState } from '../states';
@Component({
    selector: 'app-catype-list',
    templateUrl: './catype-list.component.html',
    styleUrls: ['./catype-list.component.scss'],
    providers: [MessageService, ConfirmationService, RxState],
})
export class CATypeListComponent implements OnInit {
    displayAddEditModal: boolean = false;
    displayDetailModal: boolean = false;
    catype: any = null;

    modalType: string = 'Add';

    refresh$ = new Subject<void>();
    onRefreshHandler$ = new Subject<void>();

    get caTypes$(): Observable<CAType[]> {
        return this.caTypeListState.select('catypes').pipe(shareReplay(1));
    }

    get loading$(): Observable<boolean> {
        return this.caTypeListState.select('loading');
    }

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private caTypeService: CaTypeService,
        private caTypeListState: RxState<CATypeListState>
    ) {}

    private connectState(): void {
        const handler$ = this.onRefreshHandler$.pipe(
            switchMap(() =>
                this.caTypeService
                    .GetCATypes()
                    .pipe(
                        tap(() => this.caTypeListState.set({ loading: true }))
                    )
            )
        );
        this.caTypeListState.connect(handler$, (prev, curr) => ({
            ...prev,
            catypes: curr,
            loading: false,
        }));
    }

    private manageEvent(): void {
        this.caTypeListState.hold(this.refresh$, () => {
            this.onRefreshHandler$.next();
            this.caTypeListState.set({ loading: true });
        });
    }

    hideAddEditModal(isClosed: boolean) {
        this.displayAddEditModal = !isClosed;
    }

    showAddModal() {
        this.displayAddEditModal = true;
        this.modalType = 'Add';
        this.catype = null;
    }
    showUpdateModal(rl: any) {
        this.catype = rl;
        this.modalType = 'Edit';
        this.displayAddEditModal = true;
    }

    ngOnInit() {
        this.manageEvent();
        this.connectState();
        this.refresh$.next();
    }

    AddCAType(res: any) {
        this.refresh$.next();
    }
    //write a function using rxstate in angular
    confirmDelete(event: Event, catype: CAType) {
        this.confirmationService.confirm({
            key: 'confirmDelete',
            target: event.target || new EventTarget(),
            message: `Bạn muốn xóa ${catype.CAName}?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.caTypeService
                    .DeleteCAType(catype)
                    .subscribe((result: MyResponse) => {
                        if (result.success) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: `Bạn đã xóa thành công ${catype.CAName}`,
                            });
                            this.refresh$.next();
                        }
                    });
            },
        });
    }
}
