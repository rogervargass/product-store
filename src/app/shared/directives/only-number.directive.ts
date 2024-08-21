import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  constructor(private element: ElementRef<HTMLInputElement>, private renderer: Renderer2) {}
    
  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let result = input.value.replace(/[^\d-]/g, '');
    const formatted = this.formatCurrency(result);
    this.renderer.setProperty(this.element.nativeElement, 'value', formatted);
    input.value = formatted;
    input.dispatchEvent(new Event('input'));
  }

  private formatCurrency(value: string) {
    if(!value) return '';

    if(value === '-') return '-';

    const numericValue = parseFloat(value) / 10;
    const formatted = numericValue.toFixed(1);
    const parts = formatted.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${parts.join(',')}`;
  }
}