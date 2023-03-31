import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SuperHerosService } from 'src/app/services/super-heros.service';
import { Superheroe } from 'src/models/Superheroe.model';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let dialog: MatDialog;
  let dialogSpy: jasmine.Spy;

  
  const MockSuperHerosService = jasmine.createSpyObj('SuperHerosService', ['getHeroes', 'deleteHeroeById', 'searchByString'])
  const mockResponseHeroes: Superheroe[] = [{"id": 1, "name": "Ant-Man", "realName": "Hank Pym", "gender": "Male", "weight": 95, "age": 35, "url": "https://www.superherodb.com/pictures2/portraits/10/100/857.jpg"},{ "id": 2, "name": "Aquaman", "realName": "Orin", "gender": "Male", "weight": 95, "age": 35, "url": "https://www.superherodb.com/pictures2/portraits/10/100/634.jpg"}]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      imports: [ HttpClientTestingModule, MatDialogModule, BrowserAnimationsModule, NoopAnimationsModule ],
      providers: [
        {provide: SuperHerosService, useValue: MockSuperHerosService}
      ]
    })
    .compileComponents();

    MockSuperHerosService.getHeroes.and.returnValue(of(mockResponseHeroes))
    const dialog = TestBed.inject(MatDialog)
    const dialogRef = { afterClosed: ()=> of(true)} as MatDialogRef<any,boolean>
    dialogSpy = spyOn(dialog, 'open').and.returnValue(dialogRef)

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onInit debe llamar al servicio para traer todos los heroes', ()=> {
    component.ngOnInit();

    expect(MockSuperHerosService.getHeroes).toHaveBeenCalled();
    expect(component.heroesList).toEqual(mockResponseHeroes)
    expect(component.dataSource.data).toEqual(mockResponseHeroes)

  })

  it('#onDelete debe llamar a deletHeroeById y pasarle por parametro un heroe', ()=>{
    const heroe = {"id": 1, "name": "Ant-Man", "realName": "Hank Pym", "gender": "Male", "weight": 95, "age": 35, "url": "https://www.superherodb.com/pictures2/portraits/10/100/857.jpg"}
    component.onDelete(heroe);

    expect(MockSuperHerosService.deleteHeroeById).toHaveBeenCalled();
    expect(MockSuperHerosService.deleteHeroeById).toHaveBeenCalledWith(heroe);
  })

  it('#onSearch debe llamar a searchByString y pasarle por parametro searchFilter', () => {
    component.searchFilter = 'man';

    component.onSearch();

    expect(MockSuperHerosService.searchByString).toHaveBeenCalledWith('man')
  })

  it('#openDialog debe abir el matDialog y al cerrarse debe llamar a onDelete', () => {
    const heroe = {"id": 1, "name": "Ant-Man", "realName": "Hank Pym", "gender": "Male", "weight": 95, "age": 35, "url": "https://www.superherodb.com/pictures2/portraits/10/100/857.jpg"};
    
  
    spyOn(component, 'onDelete');

    component.openDialog(heroe);
    expect(dialogSpy).toHaveBeenCalled();
    expect(component.onDelete).toHaveBeenCalledWith(heroe);
  })




});
