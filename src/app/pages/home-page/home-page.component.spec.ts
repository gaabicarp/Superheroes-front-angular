import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperHerosService } from 'src/app/services/super-heros.service';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const MockSuperHerosService = jasmine.createSpyObj('SuperHerosService', ['getHeroes', 'getHeroeById', 'getHeroesByString', 'modifyHeroeById', 'deleteHeroeById', 'addHeroe'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent, MatDialog ],
      providers: [
        {provide: SuperHerosService, useValue: MockSuperHerosService}
      ]
    })
    .compileComponents();

    // MockSuperHerosService.getHeros.and.returnValue({"id": 54, "name": "Superman", "realName": "Clark Kent", "gender": "Male", "url": "https://www.superherodb.com/pictures2/portraits/10/100/791.jpg"})

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onInit debe llamar al servicio para traer todos los heroes', ()=> {
    component.ngOnInit();

    expect(SuperHerosService.getHeroes)

  })

  it('#searchHeroe debe mostrar en listado el héroe seleccionado', ()=>{
    const superman = {"id": 54, "name": "Superman", "realName": "Clark Kent", "gender": "Male", "url": "https://www.superherodb.com/pictures2/portraits/10/100/791.jpg"};
    component.searchFilter = 'Superman';

    component.filterHero();

    expect(SuperHerosService.getHeroesByString).toHaveBeenCalled();

    expect(component.filteredHeroes).toEqual(superman)
  })

  it('#openDialog debe abrir el dialog de alta/modificacion', ()=>{
    spyOn(component.dialog, ['open'])

    expect(dialog.open).toHaveBeenCalled();
  })

  it('#addHeroe debe llamar al servicio para agregar un nuevo heroe', ()=>{
    const newHeroe = {"id": 55, "name": "Wolverine", "realName": "Logan", "gender": "Male", "url": "https://www.superherodb.com/pictures2/portraits/10/100/161.jpg"}

    component.addHeroe(newHeroe)

    expect(SuperHerosService.addHeroe).toHaveBeenCalled();
  })

  it('#editHeroe debe llamar al servicio para editar un nuevo heroe', ()=>{
    const heroe = {"id": 54, "name": "Superman", "realName": "Clark Kenttttt", "gender": "Male", "url": "https://www.superherodb.com/pictures2/portraits/10/100/791.jpg"};

    component.editHeroe(heroe)

    expect(SuperHerosService.modifyHeroeById).toHaveBeenCalled();
  })

  it('#deleteHeroe debe llamar al servicio para eliminar un nuevo heroe', ()=>{
    const heroe = {"id": 54, "name": "Superman", "realName": "Clark Kenttttt", "gender": "Male", "url": "https://www.superherodb.com/pictures2/portraits/10/100/791.jpg"};

    component.deleteHeroe(heroe.id)

    expect(SuperHerosService.deleteHeroeById).toHaveBeenCalled();
  })







});
