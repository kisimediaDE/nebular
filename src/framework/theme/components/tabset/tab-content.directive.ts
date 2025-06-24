import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Directive to wrap tab lazy content.
 * */
@Directive({ selector: '[nbTabContent]' })
export class NbTabContentDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);

  constructor() {}
}
