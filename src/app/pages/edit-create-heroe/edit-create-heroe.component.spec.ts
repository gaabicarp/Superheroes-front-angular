import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SuperHerosService } from 'src/app/services/super-heros.service';

import { EditCreateHeroeComponent } from './edit-create-heroe.component';

describe('EditCreateHeroeComponent', () => {
  let component: EditCreateHeroeComponent;
  let fixture: ComponentFixture<EditCreateHeroeComponent>;

  const heroe = {"id": 1, "name": "Ant-Man", "realName": "Hank Pym", "gender": "Male", "weight": 95, "age": 35, "url": "https://www.superherodb.com/pictures2/portraits/10/100/857.jpg"}
  const MockSuperHerosService = jasmine.createSpyObj('SuperHerosService', ['getHeroById'])

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ EditCreateHeroeComponent ],
      imports: [ ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [
        {provide: SuperHerosService, useValue: MockSuperHerosService}
      ]
    })
    .compileComponents();

    MockSuperHerosService.getHeroById.and.returnValue(of(heroe))

    fixture = TestBed.createComponent(EditCreateHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit debe llamar a createForm', () => {
    spyOn(component, 'createForm');
    spyOn(component, 'getHeroById');
    
    
    component.ngOnInit();

    expect(component.createForm).toHaveBeenCalled();
  })

  it('#getHeroById debe llamar a heroe por id', () => {
    component.heroeId = 1;
    spyOn(component, 'setValueForm');

    component.getHeroById();

    expect(MockSuperHerosService.getHeroById).toHaveBeenCalled();
    expect(component.heroe).toBe(heroe);
    expect(component.setValueForm).toHaveBeenCalled();
  })

  it('#createForm debe crear un formulario con los controles apropiados', () => {
    component.createForm();
  
    expect(component.superHeroForm.contains('id')).toBeTrue();
    expect(component.superHeroForm.contains('name')).toBeTrue();
    expect(component.superHeroForm.contains('realName')).toBeTrue();
    expect(component.superHeroForm.contains('age')).toBeTrue();
    expect(component.superHeroForm.contains('gender')).toBeTrue();
    expect(component.superHeroForm.contains('weight')).toBeTrue();
    expect(component.superHeroForm.contains('url')).toBeTrue();
  });

  it('#setValue debe setear los valores correspondientes al form', () => {
    component.heroe = heroe;
    component.setValueForm();

    expect(component.superHeroForm.value.id).toEqual(1);
    expect(component.superHeroForm.value.name).toEqual("Ant-Man");
    expect(component.superHeroForm.value.realName).toEqual("Hank Pym");
    expect(component.superHeroForm.value.gender).toEqual("Male");
    expect(component.superHeroForm.value.weight).toEqual(95);
    expect(component.superHeroForm.value.age).toEqual(35);
    expect(component.superHeroForm.value.url).toEqual("https://www.superherodb.com/pictures2/portraits/10/100/857.jpg");
  })


})