import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({ selector: '[nbTabTitle]' })
export class NbTabTitleDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);

  constructor() {}
}
