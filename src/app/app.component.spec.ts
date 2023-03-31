import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { LoadingService } from './services/loading.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockLoadService = jasmine.createSpyObj('LoadService', ['getLoading']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: LoadingService, useValue: mockLoadService}
      ]
    }).compileComponents();

    mockLoadService.getLoading.and.returnValue(of(false))
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit debería actualizar la variable load correctamente', ()=>{
    component.ngOnInit();

    expect(mockLoadService.getLoading).toHaveBeenCalled();
  })

});
