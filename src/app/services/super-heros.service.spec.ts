import { TestBed } from '@angular/core/testing';
import { data } from 'src/data/mock-heroes';
import { SuperHerosService } from './super-heros.service';

describe('SuperHerosService', () => {
  let service: SuperHerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getHeroes debe traer todos los héroes', ()=> {
    let rta = service.getHeroes();
    expect(rta).toEqual(data)
  })

  it('#getHeroeById debe traer el héroe correspondiende al id dado', ()=> {
    const heroe = {"id": 2, "name": "Aquaman", "realName": "Orin", "gender": "Male", "url": "https://www.superherodb.com/pictures2/portraits/10/100/634.jpg"};

    const result = service.getHeroeById(2)
    
    expect(result).toEqual(heroe)
  })

  it('#getHeroesByString debe traer todos los héroes que contienen el parametro dado', ()=> {
    const heroe = {"id": 2, "name": "Aquaman", "realName": "Orin", "gender": "Male", "url": "https://www.superherodb.com/pictures2/portraits/10/100/634.jpg"};

    const result = service.getHeroesByString('Aquaman')

    expect(result).toEqual(heroe)
  })

  it('#modifyHeroeById debe modificar el héroe con los nuevos valores dados', ()=> {
    const editedHeroe = {"id": 2, "name": "Aquaman", "realName": "Pedro Martinez", "gender": "Male", "url": "https://www.superherodb.com/pictures2/portraits/10/100/634.jpg"};

    service.modifyHeroeById(editedHeroe);

    const result = service.getHeroeById(2)

    expect(result.realName).toEqual('Pedro Martinez')
  })

  it('#deleteHeroeById debe eliminar el heroe correspondiente al id dado', ()=> {
    
    service.deleteHeroeById(3)

    const result = service.getHeroeById(3)

    expect(result).toBeNull();
  })
});
