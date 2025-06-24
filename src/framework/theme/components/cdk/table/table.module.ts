import {
  ChangeDetectorRef,
  ElementRef,
  IterableDiffers,
  NgModule,
  Component,
  Provider,
  inject,
  HostAttributeToken,
} from '@angular/core';
import { CdkTable, CdkTableModule, RenderRow, RowContext, StickyPositioningListener } from '@angular/cdk/table';
import { _DisposeViewRepeaterStrategy, _VIEW_REPEATER_STRATEGY, _ViewRepeater } from '@angular/cdk/collections';

import { NbBidiModule } from '../bidi/bidi.module';
import { NbDirectionality } from '../bidi/bidi-service';
import { NbPlatform } from '../platform/platform-service';
import { NB_DOCUMENT } from '../../../theme.options';
import { NbViewportRulerAdapter } from '../adapter/viewport-ruler-adapter';
import { NB_STICKY_POSITIONING_LISTENER } from '../../cdk/table/type-mappings';
import {
  NbCellDefDirective,
  NbCellDirective,
  NbColumnDefDirective,
  NbFooterCellDefDirective,
  NbFooterCellDirective,
  NbHeaderCellDefDirective,
  NbHeaderCellDirective,
} from './cell';
import {
  NbCellOutletDirective,
  NbDataRowOutletDirective,
  NbFooterRowOutletDirective,
  NbHeaderRowOutletDirective,
  NbFooterRowComponent,
  NbFooterRowDefDirective,
  NbHeaderRowComponent,
  NbHeaderRowDefDirective,
  NbRowComponent,
  NbRowDefDirective,
  NbNoDataRowOutletDirective,
} from './row';

export const NB_TABLE_TEMPLATE = `
  <ng-container nbHeaderRowOutlet></ng-container>
  <ng-container nbRowOutlet></ng-container>
  <ng-container nbNoDataRowOutlet></ng-container>
  <ng-container nbFooterRowOutlet></ng-container>
`;

export const NB_VIEW_REPEATER_STRATEGY = _VIEW_REPEATER_STRATEGY;

export const NB_TABLE_PROVIDERS: Provider[] = [
  { provide: NB_VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
];

@Component({
  selector: 'nb-table-not-implemented',
  template: ``,
  providers: NB_TABLE_PROVIDERS,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class NbTable<T> extends CdkTable<T> {
  protected readonly _viewRepeater: _ViewRepeater<T, RenderRow<T>, RowContext<T>>;
  protected readonly _stickyPositioningListener: StickyPositioningListener;

  constructor() {
    const differs = inject(IterableDiffers);
    const changeDetectorRef = inject(ChangeDetectorRef);
    const elementRef = inject(ElementRef);
    const role = inject(new HostAttributeToken('role'), { optional: true })!;
    const dir = inject(NbDirectionality);
    const document = inject(NB_DOCUMENT);
    const platform = inject(NbPlatform);
    const _viewRepeater = inject<_ViewRepeater<T, RenderRow<T>, RowContext<T>>>(_VIEW_REPEATER_STRATEGY);
    const _viewportRuler = inject(NbViewportRulerAdapter);
    const _stickyPositioningListener = inject<StickyPositioningListener>(NB_STICKY_POSITIONING_LISTENER, {
      optional: true,
      skipSelf: true,
    })!;

    super(
      differs,
      changeDetectorRef,
      elementRef,
      role,
      dir,
      document,
      platform,
      _viewRepeater,
      _viewportRuler,
      _stickyPositioningListener,
    );

    this._viewRepeater = _viewRepeater;
    this._stickyPositioningListener = _stickyPositioningListener;
  }
}

const COMPONENTS = [
  NbTable,

  // Template defs
  NbHeaderCellDefDirective,
  NbHeaderRowDefDirective,
  NbColumnDefDirective,
  NbCellDefDirective,
  NbRowDefDirective,
  NbFooterCellDefDirective,
  NbFooterRowDefDirective,

  // Outlets
  NbDataRowOutletDirective,
  NbHeaderRowOutletDirective,
  NbFooterRowOutletDirective,
  NbNoDataRowOutletDirective,
  NbCellOutletDirective,

  // Cell directives
  NbHeaderCellDirective,
  NbCellDirective,
  NbFooterCellDirective,

  // Row directives
  NbHeaderRowComponent,
  NbRowComponent,
  NbFooterRowComponent,
];

@NgModule({
  imports: [NbBidiModule, ...COMPONENTS],
  exports: [...COMPONENTS],
})
export class NbTableModule extends CdkTableModule {}
