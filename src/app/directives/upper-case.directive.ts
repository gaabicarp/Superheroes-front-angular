import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appUpperCase]',
})
export class UpperCaseDirective {
  constructor(private readonly elRef: ElementRef) {}
  @HostListener('input', ['$event'])
  onChangeInput(event: Event): void {
    const initValue = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value =
      this.elRef.nativeElement.value.toUpperCase();
  }
}
