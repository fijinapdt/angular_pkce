import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneNumber]',
})
export class PhoneNumberDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    console.log(this.el.nativeElement.value);

    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = this.format(initialValue);
    this.control.valueAccessor?.writeValue(this.el.nativeElement.value);
  }

  private format(v: string): string {
    if (!v) return '';

    let val = v.replace(/\D/g, ''); // remove non-digits

    if (val.length <= 3) {
      return val;
    }

    if (val.length <= 6) {
      return val.slice(0, 3) + '-' + val.slice(3);
    }

    return val.slice(0, 3) + '-' + val.slice(3, 6) + '-' + val.slice(6);
  }
}
