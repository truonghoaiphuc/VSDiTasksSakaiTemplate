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
import { Observable, shareReplay } from 'rxjs';
import { Role } from 'src/app/Models/role.model';
import { UserInfo } from 'src/app/Models/user.model';
import { UserPageState, USER_PAGE_STATE } from '../states';

@Component({
    selector: 'app-userdetail',
    templateUrl: './userdetail.component.html',
    styleUrls: ['./userdetail.component.scss'],
})
export class UserdetailComponent implements OnInit, OnChanges {
    @Input() displayDetailModal: boolean = true;
    @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() user: any = null;

    usInfo!: UserInfo;

    formCreate!: FormGroup;
    genders: any[] = [];

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
        @Inject(USER_PAGE_STATE)
        private userPageState: RxState<UserPageState>
    ) {}

    ngOnInit(): void {
        this.initForm();
    }
    initForm() {
        this.formCreate = this.formBuilder.group({
            userName: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            password: ['', [Validators.required]],
            cfPassword: ['', [Validators.required]],
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
    ngOnChanges(): void {
        if (this.user) {
            console.log(this.user);
            this.formCreate.patchValue(this.user);
            const dob = new Date(this.user.dateOfBirth);
            this.formCreate.controls['dateOfBirth'].setValue(dob);
        }
    }

    closeModal() {
        this.clickClose.emit(true);
    }
}
