import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlesListComponent } from './titles-list.component';

describe('TitlesListComponent', () => {
    let component: TitlesListComponent;
    let fixture: ComponentFixture<TitlesListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TitlesListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TitlesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
