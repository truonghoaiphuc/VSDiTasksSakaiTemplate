import { Component, OnInit } from '@angular/core';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-my-tasks',
    templateUrl: './my-tasks.component.html',
    styleUrls: ['./my-tasks.component.scss'],
})
export class MyTasksComponent implements OnInit {
    itasks = [
        {
            name: 'Chấm công đầu ngày',
            description: 'thực hiện việc chấm công bằng vân tay đầu ngày',
        },
        {
            name: 'Xây dựng quy trình học',
            description:
                'thực hiện việc góp ý quy trình học tập nâng cao trình độ',
        },
    ];

    constructor() {}

    ngOnInit(): void {}

    todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

    done = [
        'Get up',
        'Brush teeth',
        'Take a shower',
        'Check e-mail',
        'Walk dog',
    ];

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }
}
