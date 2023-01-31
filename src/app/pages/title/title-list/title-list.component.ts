import { Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { MyResponse } from 'src/app/Models/myresponse.model';
import { Title } from 'src/app/Models/title.model';
import { TitleService } from 'src/app/Services/title.service';
import { TitleListState } from '../states';

@Component({
    selector: 'app-title-list',
    templateUrl: './title-list.component.html',
    styleUrls: ['./title-list.component.scss'],
    providers: [MessageService, ConfirmationService, RxState],
})
export class TitleListComponent implements OnInit {
    displayAddEditModal: boolean = false;
    title: any = null;

    modalType: string = 'Add';

    refresh$ = new Subject<void>();
    onRefreshHandler$ = new Subject<void>();

    get titles$(): Observable<Title[]> {
        return this.titleListState.select('titles').pipe(shareReplay(1));
    }

    get loading$(): Observable<boolean> {
        return this.titleListState.select('loading');
    }

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private titleService: TitleService,
        private titleListState: RxState<TitleListState>
    ) {}

    private connectState(): void {
        const handler$ = this.onRefreshHandler$.pipe(
            switchMap(() =>
                this.titleService
                    .GetTitles()
                    .pipe(tap(() => this.titleListState.set({ loading: true })))
            )
        );
        this.titleListState.connect(handler$, (prev, curr) => ({
            ...prev,
            companies: curr,
            loading: false,
        }));
    }

    private manageEvent(): void {
        this.titleListState.hold(this.refresh$, () => {
            this.onRefreshHandler$.next();
            this.titleListState.set({ loading: true });
        });
    }

    hideAddEditModal(isClosed: boolean) {
        this.displayAddEditModal = !isClosed;
    }

    showAddModal() {
        this.displayAddEditModal = true;
        this.modalType = 'Add';
        this.title = null;
    }
    showUpdateModal(rl: any) {
        this.title = rl;
        this.modalType = 'Edit';
        this.displayAddEditModal = true;
    }

    ngOnInit() {
        this.manageEvent();
        this.connectState();
        this.refresh$.next();
    }

    AddTitle(res: any) {
        this.refresh$.next();
    }
    //write a function using rxstate in angular
    confirmDelete(event: Event, title: Title) {
        this.confirmationService.confirm({
            key: 'confirmDelete',
            target: event.target || new EventTarget(),
            message: `Bạn muốn xóa chức danh ${title.TitleName}?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.titleService
                    .DeleteTitle(title)
                    .subscribe((result: MyResponse) => {
                        if (result.success) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: `Bạn đã xóa thành công ${title.TitleName}`,
                            });
                            this.refresh$.next();
                        }
                    });
            },
        });
    }
}
