import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NbAccessChecker } from '../services/access-checker.service';

@Directive({ selector: '[nbIsGranted]' })
export class NbIsGrantedDirective implements OnDestroy {
  private templateRef = inject<TemplateRef<any>>(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private accessChecker = inject(NbAccessChecker);

  private destroy$ = new Subject<void>();

  private hasView = false;

  constructor() {}

  @Input() set nbIsGranted([permission, resource]: [string, string]) {
    this.accessChecker
      .isGranted(permission, resource)
      .pipe(takeUntil(this.destroy$))
      .subscribe((can: boolean) => {
        if (can && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!can && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
