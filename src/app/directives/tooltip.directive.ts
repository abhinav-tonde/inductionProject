import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, Injector, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {

  @Input('appTooltip') toolTipTitle: string = '';
  @Input() placement?: string;
  @Input() delay?: number;
  tooltip?: HTMLElement;
  offset = 10;

  constructor(private elem: ElementRef) {

  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) {
      this.show();
    }
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.hide();
    }
  }

  show() {
    this.create();
    this.setPosition();
    this.tooltip?.classList.add('ng-tooltip-show')
  }

  hide() {
    this.tooltip?.classList.remove('ng-tooltip-show')
    window.setTimeout(() => {
      this.tooltip?.remove()
    }, this.delay)
  }

  create() {
    this.tooltip = document.createElement('span');
    this.tooltip?.classList.add('ng-tooltip')
    this.tooltip.textContent = this.toolTipTitle;
    document.body.appendChild(this.tooltip);
  }

  setPosition() {
    const elemRect = this.elem.nativeElement.getBoundingClientRect();
    const toolTipRect = this.tooltip?.getBoundingClientRect();

    if (!toolTipRect) 
      return;
    
    let left;
    let top;

    switch (this.placement) {
      case 'top':
        left = elemRect.left + (elemRect.width - toolTipRect.width) / 2
        top = elemRect.top - toolTipRect.height - this.offset;
        break;

      case 'bottom':
        top = elemRect.bottom + this.offset;
        left = elemRect.left + (elemRect.width - toolTipRect.width) / 2
        break;

      case 'left':
        top = elemRect.top + (elemRect.height - toolTipRect.height) / 2;
        left = elemRect.left - toolTipRect.width - this.offset
        break;

      case 'right':
        top = elemRect.top + (elemRect.height - toolTipRect.height) / 2;
        left = elemRect.left + this.offset
        break;

      default:
        throw new Error(`Invalid placement value ${this.placement}`)

    }

    if (this.tooltip) {
      this.tooltip.style.top = `${top}px`
      this.tooltip.style.left = `${left}px`
    }
  }

}
