import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { LoadingService } from './loading.service';

describe('LoadServiceService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#show debe llamar a loadingSubject con true', () => {
    spyOn(service.loadingSubject, 'next');
    service.show();
    expect(service.loadingSubject.next).toHaveBeenCalledWith(true);
  });

  it('#hide debe llamar a loadingSubject con false', () => {
    spyOn(service.loadingSubject, 'next');
    service.hide();
    expect(service.loadingSubject.next).toHaveBeenCalledWith(false);
  });

  it('#getLoading debe devolver loadingSubject como observable', () => {
    service.getLoading().subscribe((result) => {
      expect(typeof result).toBe('boolean');
    });
  })





});
