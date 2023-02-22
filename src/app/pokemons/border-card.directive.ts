import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderCard]'
})
export class BorderCardDirective {

  constructor(private el: ElementRef) { 
    this.setBoarder('transparent');
  }
//mode initialisation strictPropertyInitialisation = true dan le tsConfig.json
//par conscecant il est initialisé
  @Input('appBorderCard') borderColor: string | null = null;

  @HostListener('mouseenter')onMouseEnter(){
    this.setBoarder(this.borderColor || "#A33EA1");
  }
  @HostListener('mouseleave')onMouseLeave(){
    this.setBoarder('transparent');
  }

  setBoarder(color:string) {
    this.el.nativeElement.style.border = `solid 4px  ${color}`
  }
}
