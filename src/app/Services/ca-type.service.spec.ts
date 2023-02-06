import { TestBed } from '@angular/core/testing';

import { CaTypeService } from './ca-type.service';

describe('CaTypeService', () => {
  let service: CaTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
