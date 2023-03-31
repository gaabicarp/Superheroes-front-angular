import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { Superheroe } from 'src/models/Superheroe.model';
import { SuperHerosService } from './super-heros.service';

describe('SuperHerosService', () => {
  let service: SuperHerosService;
  let httpMock: HttpTestingController;

  const mockResponseHeroes: Superheroe[] = [{"id": 1, "name": "Ant-Man", "realName": "Hank Pym", "gender": "Male", "weight": 95, "age": 35, "url": "https://www.superherodb.com/pictures2/portraits/10/100/857.jpg"},{ "id": 2, "name": "Aquaman", "realName": "Orin", "gender": "Male", "weight": 95, "age": 35, "url": "https://www.superherodb.com/pictures2/portraits/10/100/634.jpg"}]

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule],
        providers: [ SuperHerosService ]
      });
    service = TestBed.inject(SuperHerosService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', (done) => {
    expect(service).toBeTruthy();
    const request = httpMock.expectOne('http://localhost:3000/data');
    request.flush({});
  
    service.heroes$.subscribe(() => {
      expect(service.heroesBackup).toBeDefined();
      done();
    });
  });


})
