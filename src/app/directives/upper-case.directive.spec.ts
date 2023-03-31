import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UpperCaseDirective } from './upper-case.directive';

@Component({
  template: `<input type="text" appUpperCase>`
})
class TestComponent {}



describe('UpperCaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ UpperCaseDirective, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges();
  
    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
  });
  
  it('should create an instance', () => {
    const directive = new UpperCaseDirective(new ElementRef(inputEl));
    expect(directive).toBeTruthy();
  });

  it('deberia cambiar el texto a uppercase', () =>{
    const directive = new UpperCaseDirective(new ElementRef(inputEl));
    inputEl.value = 'test';
    fixture.detectChanges();

    const event = new Event('input');
    inputEl.dispatchEvent(event);

    expect(inputEl.value).toEqual('TEST')
  })
});
