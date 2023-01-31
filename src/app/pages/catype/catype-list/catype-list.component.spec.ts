import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CATypeListComponent } from './catype-list.component';

describe('CATypeListComponent', () => {
  let component: CATypeListComponent;
  let fixture: ComponentFixture<CATypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CATypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CATypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
