import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditdepartmentComponent } from './addeditdepartment.component';

describe('AddeditdepartmentComponent', () => {
  let component: AddeditdepartmentComponent;
  let fixture: ComponentFixture<AddeditdepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditdepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
