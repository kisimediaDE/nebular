import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({ selector: `[nbChatTitle]` })
export class NbChatTitleDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);

  @Input() context: Object = {};

  constructor() {}
}
