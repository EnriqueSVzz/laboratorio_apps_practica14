import { TestBed } from '@angular/core/testing';

import { DescubrirService } from './descubrir.service';

describe('DescubrirService', () => {
  let service: DescubrirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescubrirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
