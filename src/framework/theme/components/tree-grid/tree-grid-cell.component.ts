/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NbLayoutDirectionService } from '../../services/direction.service';
import { NB_WINDOW } from '../../theme.options';
import { NbCellDirective, NbFooterCellDirective, NbHeaderCellDirective } from '../cdk/table/cell';
import { NbCdkCell, NbCdkFooterCell, NbCdkHeaderCell } from '../cdk/table/type-mappings';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import { NbTreeGridComponent } from './tree-grid.component';
import { NbTreeGridColumnDefDirective } from './tree-grid-column-def.directive';
import { NB_DEFAULT_ROW_LEVEL } from './data-source/tree-grid.model';
import { NbColumnsService } from './tree-grid-columns.service';

@Directive({
  selector: 'td[nbTreeGridCell]',
  host: {
    class: 'nb-tree-grid-cell',
    role: 'gridcell',
  },
  providers: [{ provide: NbCdkCell, useExisting: NbTreeGridCellDirective }],
})
export class NbTreeGridCellDirective extends NbCellDirective implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private window = inject(NB_WINDOW);
  private sanitizer = inject(DomSanitizer);
  private directionService = inject(NbLayoutDirectionService);
  private columnService = inject(NbColumnsService);
  private cd = inject(ChangeDetectorRef);

  private destroy$ = new Subject<void>();
  private readonly tree: NbTreeGridComponent<any>;
  private readonly columnDef: NbTreeGridColumnDefDirective;
  private initialLeftPadding: string = '';
  private initialRightPadding: string = '';
  private latestWidth: string;
  elementRef: ElementRef<HTMLElement>;

  @HostBinding('style.width')
  get columnWidth(): string {
    this.latestWidth = this.tree.getColumnWidth();
    if (this.latestWidth) {
      return this.latestWidth;
    }

    return null;
  }

  @HostBinding('style.padding-left')
  get leftPadding(): string | SafeStyle | null {
    if (this.directionService.isLtr()) {
      return this.getStartPadding();
    }
    return null;
  }

  @HostBinding('style.padding-right')
  get rightPadding(): string | SafeStyle | null {
    if (this.directionService.isRtl()) {
      return this.getStartPadding();
    }
    return null;
  }

  constructor() {
    const columnDef = inject(NbTreeGridColumnDefDirective);
    const elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    const tree = inject(NB_TREE_GRID);

    super();
    this.tree = tree as NbTreeGridComponent<any>;
    this.columnDef = columnDef;
    this.elementRef = elementRef;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const style = this.window.getComputedStyle(this.elementRef.nativeElement);
      this.initialLeftPadding = style.paddingLeft;
      this.initialRightPadding = style.paddingRight;
    }

    this.columnService
      .onColumnsChange()
      .pipe(
        filter(() => this.latestWidth !== this.tree.getColumnWidth()),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.cd.detectChanges());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleRow(): void {
    this.tree.toggleCellRow(this);
  }

  private get initialStartPadding(): string {
    return this.directionService.isLtr() ? this.initialLeftPadding : this.initialRightPadding;
  }

  private getStartPadding(): string | SafeStyle | null {
    const rowLevel = this.tree.getCellLevel(this, this.columnDef.name);
    if (rowLevel === NB_DEFAULT_ROW_LEVEL) {
      return null;
    }

    const nestingLevel = rowLevel + 1;
    let padding: string = '';
    if (this.tree.levelPadding) {
      padding = `calc(${this.tree.levelPadding} * ${nestingLevel})`;
    } else if (this.initialStartPadding) {
      padding = `calc(${this.initialStartPadding} * ${nestingLevel})`;
    }

    if (!padding) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustStyle(padding);
  }
}

@Directive({
  selector: 'th[nbTreeGridHeaderCell]',
  host: {
    class: 'nb-tree-grid-header-cell',
    role: 'columnheader',
  },
  providers: [{ provide: NbCdkHeaderCell, useExisting: NbTreeGridHeaderCellDirective }],
})
export class NbTreeGridHeaderCellDirective extends NbHeaderCellDirective implements OnInit, OnDestroy {
  private columnService = inject(NbColumnsService);
  private cd = inject(ChangeDetectorRef);

  private destroy$ = new Subject<void>();
  private latestWidth: string;
  private readonly tree: NbTreeGridComponent<any>;

  @HostBinding('style.width')
  get columnWidth(): string {
    this.latestWidth = this.tree.getColumnWidth();
    return this.latestWidth || null;
  }

  constructor() {
    const columnDef = inject(NbTreeGridColumnDefDirective);
    const elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    const tree = inject(NB_TREE_GRID);

    super();
    this.tree = tree as NbTreeGridComponent<any>;
  }

  ngOnInit() {
    this.columnService
      .onColumnsChange()
      .pipe(
        filter(() => this.latestWidth !== this.tree.getColumnWidth()),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.cd.detectChanges());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Directive({
  selector: 'td[nbTreeGridFooterCell]',
  host: {
    class: 'nb-tree-grid-footer-cell',
    role: 'gridcell',
  },
  providers: [{ provide: NbCdkFooterCell, useExisting: NbTreeGridFooterCellDirective }],
})
export class NbTreeGridFooterCellDirective extends NbFooterCellDirective implements OnInit, OnDestroy {
  private columnService = inject(NbColumnsService);
  private cd = inject(ChangeDetectorRef);

  private destroy$ = new Subject<void>();
  private latestWidth: string;
  private readonly tree: NbTreeGridComponent<any>;

  @HostBinding('style.width')
  get columnWidth(): string {
    this.latestWidth = this.tree.getColumnWidth();
    return this.latestWidth || null;
  }

  constructor() {
    const columnDef = inject(NbTreeGridColumnDefDirective);
    const elementRef = inject(ElementRef);
    const tree = inject(NB_TREE_GRID);

    super();
    this.tree = tree as NbTreeGridComponent<any>;
  }

  ngOnInit() {
    this.columnService
      .onColumnsChange()
      .pipe(
        filter(() => this.latestWidth !== this.tree.getColumnWidth()),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.cd.detectChanges());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
