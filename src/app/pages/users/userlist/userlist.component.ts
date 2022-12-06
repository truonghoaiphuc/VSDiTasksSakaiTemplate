import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative, User } from 'src/app/demo/api/customer';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UserService } from 'src/app/Services/user.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    // styleUrls: ['./userlist.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class UserlistComponent implements OnInit {
    users: User[] = [];

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

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private userService: UserService
    ) {}

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
        this.userService.GetAllUsers().then((data) => {
            this.users = data;
            this.loading = false;

            // @ts-ignore
            // this.customers1.forEach(
            //     (customer) => (customer.date = new Date(customer.date))
            // );
        });
        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' },
        ];

        this.statuses = [
            { label: 'inactive', value: 'inactive' },
            { label: 'active', value: 'active' },
        ];
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

    confirmDelete(event: Event) {
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target || new EventTarget(),
            message: 'Bạn muốn xóa người dùng này?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'You have accepted',
                });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                });
            },
        });
    }
    // expandAll() {
    //     if (!this.isExpanded) {
    //         this.products.forEach((product) =>
    //             product && product.name
    //                 ? (this.expandedRows[product.name] = true)
    //                 : ''
    //         );
    //     } else {
    //         this.expandedRows = {};
    //     }
    //     this.isExpanded = !this.isExpanded;
    // }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
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
