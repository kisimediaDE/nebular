import { NbStepperComponent } from './stepper.component';
import { Directive, HostBinding, HostListener, Input, inject } from '@angular/core';

@Directive({ selector: 'button[nbStepperNext]' })
export class NbStepperNextDirective {
  protected stepper = inject(NbStepperComponent);

  @Input() @HostBinding('attr.type') type: string = 'submit';

  constructor() {}

  @HostListener('click')
  onClick() {
    this.stepper.next();
  }
}

@Directive({ selector: 'button[nbStepperPrevious]' })
export class NbStepperPreviousDirective {
  protected stepper = inject(NbStepperComponent);

  @Input() @HostBinding('attr.type') type: string = 'button';

  constructor() {}

  @HostListener('click')
  onClick() {
    this.stepper.previous();
  }
}
