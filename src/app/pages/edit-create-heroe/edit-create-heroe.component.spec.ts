import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateHeroeComponent } from './edit-create-heroe.component';

describe('EditCreateHeroeComponent', () => {
  let component: EditCreateHeroeComponent;
  let fixture: ComponentFixture<EditCreateHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateHeroeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCreateHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
