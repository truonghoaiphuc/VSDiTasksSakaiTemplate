import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CATypeComponent } from './catype.component';

describe('CATypeComponent', () => {
  let component: CATypeComponent;
  let fixture: ComponentFixture<CATypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CATypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CATypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
