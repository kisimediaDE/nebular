/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectorRef, Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbLayoutDirection, NbLayoutDirectionService } from '../../services/direction.service';

@Directive()
abstract class NbBaseLayoutDirectionDirective implements OnInit, OnDestroy {
  protected abstract directionToShow: NbLayoutDirection;

  protected templateRef = inject<TemplateRef<any>>(TemplateRef);
  protected viewContainer = inject(ViewContainerRef);
  protected cd = inject(ChangeDetectorRef);
  protected directionService = inject(NbLayoutDirectionService);

  protected destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.directionService
      .onDirectionChange()
      .pipe(
        map((layoutDirection: NbLayoutDirection) => layoutDirection === this.directionToShow),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((shouldShow: boolean) => this.updateView<boolean>(shouldShow));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected updateView<T>(shouldShow: T): void {
    if (shouldShow && !this.viewContainer.length) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.cd.markForCheck();
    } else if (!shouldShow && this.viewContainer.length) {
      this.viewContainer.clear();
    }
  }
}

/**
 * Apply `nbLtr` directive to the element you need to show only when layout direction is `LTR`.
 *
 * ```html
 * <div *nbLtr>This text is visible only when layout direction is LTR</div>
 * ```
 */
@Directive({ selector: '[nbLtr]' })
export class NbLtrDirective extends NbBaseLayoutDirectionDirective {
  protected override directionToShow = NbLayoutDirection.LTR;
}

/**
 * Apply `nbRtl` directive to the element you need to show only when layout direction is `RTL`.
 *
 * ```html
 * <div *nbRtl>This text is visible only when layout direction is RTL</div>
 * ```
 */
@Directive({ selector: '[nbRtl]' })
export class NbRtlDirective extends NbBaseLayoutDirectionDirective {
  protected override directionToShow = NbLayoutDirection.RTL;
}
