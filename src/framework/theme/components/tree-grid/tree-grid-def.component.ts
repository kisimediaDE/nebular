import { Directive, Input, IterableDiffers, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import {
  NbCdkCellDef,
  NbCdkFooterCellDef,
  NbCdkFooterRowDef,
  NbCdkHeaderCellDef,
  NbCdkHeaderRowDef,
  NbCdkRowDef,
} from '../cdk/table/type-mappings';
import { NbCellDefDirective, NbFooterCellDefDirective, NbHeaderCellDefDirective } from '../cdk/table/cell';
import { NbFooterRowDefDirective, NbHeaderRowDefDirective, NbRowDefDirective } from '../cdk/table/row';
import { NbColumnsService } from './tree-grid-columns.service';

export interface NbTreeGridResponsiveRowDef {
  hideColumn(column: string);
  showColumn(column: string);
}

/**
 * Data row definition for the tree-grid.
 * Captures the header row's template and columns to display.
 */
@Directive({
  selector: '[nbTreeGridRowDef]',
  providers: [{ provide: NbCdkRowDef, useExisting: NbTreeGridRowDefDirective }],
  standalone: false,
})
export class NbTreeGridRowDefDirective<T>
  extends NbRowDefDirective<T>
  implements OnChanges, NbTreeGridResponsiveRowDef
{
  /**
   * Columns to be displayed on this row
   */
  @Input('nbTreeGridRowDefColumns') columns: Iterable<string>;

  constructor(template: TemplateRef<any>, differs: IterableDiffers, private columnsService: NbColumnsService) {
    super(template, differs);
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (changes['columns']) {
      this.updateColumns(this.columns);
    }
  }

  updateColumns(columns: Iterable<string>) {
    this.columnsService.setColumns(columns);
  }

  getVisibleColumns(): Iterable<string> {
    return this.columnsService.getVisibleColumns();
  }

  /** @docs-private */
  hideColumn(column: string): void {
    this.columnsService.hideColumn(column);
  }

  /** @docs-private */
  showColumn(column: string): void {
    this.columnsService.showColumn(column);
  }
}

@Directive({
  selector: '[nbTreeGridHeaderRowDef]',
  providers: [{ provide: NbCdkHeaderRowDef, useExisting: NbTreeGridHeaderRowDefDirective }],
  standalone: false,
})
export class NbTreeGridHeaderRowDefDirective
  extends NbHeaderRowDefDirective
  implements OnChanges, NbTreeGridResponsiveRowDef
{
  /**
   * Columns to be displayed on this row
   */
  @Input('nbTreeGridHeaderRowDef') columns: Iterable<string>;

  constructor(template: TemplateRef<any>, differs: IterableDiffers, private columnsService: NbColumnsService) {
    super(template, differs);
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (changes['columns']) {
      this.updateColumns(this.columns);
    }
  }

  updateColumns(columns: Iterable<string>) {
    this.columnsService.setColumns(columns);
  }

  getVisibleColumns(): Iterable<string> {
    return this.columnsService.getVisibleColumns();
  }

  /** @docs-private */
  hideColumn(column: string): void {
    this.columnsService.hideColumn(column);
  }

  /** @docs-private */
  showColumn(column: string): void {
    this.columnsService.showColumn(column);
  }
}

@Directive({
  selector: '[nbTreeGridFooterRowDef]',
  providers: [{ provide: NbCdkFooterRowDef, useExisting: NbTreeGridFooterRowDefDirective }],
  standalone: false,
})
export class NbTreeGridFooterRowDefDirective
  extends NbFooterRowDefDirective
  implements OnChanges, NbTreeGridResponsiveRowDef
{
  /**
   * Columns to be displayed on this row
   */
  @Input('nbTreeGridFooterRowDef') columns: Iterable<string>;

  constructor(template: TemplateRef<any>, differs: IterableDiffers, private columnsService: NbColumnsService) {
    super(template, differs);
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (changes['columns']) {
      this.updateColumns(this.columns);
    }
  }

  updateColumns(columns: Iterable<string>) {
    this.columnsService.setColumns(columns);
  }

  getVisibleColumns(): Iterable<string> {
    return this.columnsService.getVisibleColumns();
  }

  /** @docs-private */
  hideColumn(column: string): void {
    this.columnsService.hideColumn(column);
  }

  /** @docs-private */
  showColumn(column: string): void {
    this.columnsService.showColumn(column);
  }
}

/**
 * Cell definition for a nb-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
  selector: '[nbTreeGridCellDef]',
  providers: [{ provide: NbCdkCellDef, useExisting: NbTreeGridCellDefDirective }],
  standalone: false,
})
export class NbTreeGridCellDefDirective extends NbCellDefDirective {}

/**
 * Header cell definition for the nb-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[nbTreeGridHeaderCellDef]',
  providers: [{ provide: NbCdkHeaderCellDef, useExisting: NbTreeGridHeaderCellDefDirective }],
  standalone: false,
})
export class NbTreeGridHeaderCellDefDirective extends NbHeaderCellDefDirective {}

/**
 * Footer cell definition for the nb-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[nbTreeGridFooterCellDef]',
  providers: [{ provide: NbCdkFooterCellDef, useExisting: NbTreeGridFooterCellDefDirective }],
  standalone: false,
})
export class NbTreeGridFooterCellDefDirective extends NbFooterCellDefDirective {}
