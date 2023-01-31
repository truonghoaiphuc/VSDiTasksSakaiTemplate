import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditCATypeComponent } from './addedit-catype.component';

describe('AddeditCATypeComponent', () => {
  let component: AddeditCATypeComponent;
  let fixture: ComponentFixture<AddeditCATypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditCATypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditCATypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
