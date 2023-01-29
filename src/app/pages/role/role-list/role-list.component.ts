import { CurrencyPipe } from '@angular/common';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { MyResponse } from 'src/app/Models/myresponse.model';
import { Role } from 'src/app/Models/role.model';
import { RoleService } from 'src/app/Services/role.service';
import { RoleListState } from '../states';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  providers: [MessageService, ConfirmationService, RxState],
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];

  loading: boolean = true;

  displayAddEditModal: boolean = false;
  displayDetailModal: boolean = false;
  role: any = null;

  modalType: string = 'Add';

  refresh$ = new Subject<void>();
  onRefreshHandler$ = new Subject<void>();

  get roles$(): Observable<Role[]> {
      return this.roleListState.select('roles').pipe(shareReplay(1));
  }

  get loading$(): Observable<boolean>{
    return this.roleListState.select('loading')
  }

  constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private roleService: RoleService,
      private roleListState: RxState<RoleListState>
  ) {      
  }

  private connectState():void{
    const handler$ = this.onRefreshHandler$.pipe(switchMap(()=> (
        this.roleService.GetRoles()
        .pipe(tap(()=>this.roleListState.set({loading:true})))
    )));
    this.roleListState.connect(handler$, (prev, curr)=>({
        ...prev,
        roles:curr,
        loading:false
    }));
  }

  private manageEvent():void{
    this.roleListState.hold(this.refresh$,()=>{
        this.onRefreshHandler$.next();
        this.roleListState.set({loading:true});
    });
  }

  hideAddEditModal(isClosed: boolean) {
      this.displayAddEditModal = !isClosed;
  }

  hideDetailModal(isClosed: boolean) {
      this.displayDetailModal = !isClosed;
  }

  showDetailModal(rl: any) {
      this.role = rl;
      this.displayDetailModal = true;
  }

  showAddModal(){
      this.displayAddEditModal=true;
      this.modalType='Add';
      this.role=null;
  }
  showUpdateModal(rl: any) {
      this.role = rl;
      this.modalType = 'Edit';
      this.displayAddEditModal = true;
  }

  ngOnInit() {
    this.manageEvent();
    this.connectState();
    this.refresh$.next();
  }

  AddUser(res: any) {
      this.refresh$.next();
  }
//write a function using rxstate in angular
  confirmDelete(event: Event, id: string) {
      this.confirmationService.confirm({
          key: 'confirmDelete',
          target: event.target || new EventTarget(),
          message: `Bạn muốn xóa nhóm người dùng ${id}?`,
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.roleService
                  .DeleteRole(id)
                  .subscribe((result: MyResponse) => {
                      if (result.success) {
                          this.messageService.add({
                              severity: 'success',
                              summary: 'Thành công',
                              detail: `Bạn đã xóa thành công người dùng ${id}`,
                          });
                          this.refresh$.next();
                      }
                  });
          },
      });
  }
}
