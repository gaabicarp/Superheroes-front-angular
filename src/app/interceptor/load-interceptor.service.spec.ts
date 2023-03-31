import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoadingService } from '../services/loading.service';

import { LoadInterceptorService } from './load-interceptor.service';

describe('LoadInterceptorService', () => {
  let service: LoadInterceptorService;
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: LoadInterceptorService,
        multi: true
      },
        LoadingService
    ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(LoadInterceptorService);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#deberia mostrar un spiner cuando se hace una req', fakeAsync(() => {
    const loadingService = TestBed.inject(LoadingService);
    spyOn(loadingService, 'show').and.callThrough();

    http.get('data').subscribe();

    expect(loadingService.show).toHaveBeenCalled();

    const request = httpMock.expectOne('data');
    request.flush({})

    // tick();
  }))
});
