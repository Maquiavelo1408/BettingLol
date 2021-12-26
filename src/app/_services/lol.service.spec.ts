import { TestBed } from '@angular/core/testing';

import { LolService } from './lol.service';

describe('Lol.Service.TsService', () => {
  let service: LolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
