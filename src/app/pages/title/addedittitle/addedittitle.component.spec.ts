import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedittitleComponent } from './addedittitle.component';

describe('AddedittitleComponent', () => {
  let component: AddedittitleComponent;
  let fixture: ComponentFixture<AddedittitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedittitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddedittitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
