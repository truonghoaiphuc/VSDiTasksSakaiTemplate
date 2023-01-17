import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAccessListComponent } from './role-access-list.component';

describe('RoleAccessListComponent', () => {
  let component: RoleAccessListComponent;
  let fixture: ComponentFixture<RoleAccessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleAccessListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleAccessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
