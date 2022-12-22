import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-usercreate',
    templateUrl: './usercreate.component.html',
    // styleUrls: ['./usercreate.component.scss'],
    providers: [MessageService],
})
export class UsercreateComponent implements OnInit {
    uploadedFiles: any[] = [];
    value7: any;
    constructor(private messageService: MessageService) {}

    ngOnInit(): void {}

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
}
