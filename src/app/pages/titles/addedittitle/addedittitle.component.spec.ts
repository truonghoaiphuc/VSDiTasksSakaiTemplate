import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTitleComponent } from './addedittitle.component';

describe('AddeditcompanyComponent', () => {
    let component: AddEditTitleComponent;
    let fixture: ComponentFixture<AddEditTitleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddEditTitleComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AddEditTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
