import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ITasksComponent } from './i-tasks.component';

describe('ITasksComponent', () => {
  let component: ITasksComponent;
  let fixture: ComponentFixture<ITasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ITasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ITasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
