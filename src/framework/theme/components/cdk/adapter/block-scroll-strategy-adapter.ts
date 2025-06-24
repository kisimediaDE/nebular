import { Injectable, NgZone, inject } from '@angular/core';
import { BlockScrollStrategy, ScrollDispatcher, ScrollStrategyOptions } from '@angular/cdk/overlay';

import { NbLayoutScrollService } from '../../../services/scroll.service';
import { NB_DOCUMENT } from '../../../theme.options';
import { NbViewportRulerAdapter } from './viewport-ruler-adapter';

/**
 * Overrides default block scroll strategy because default strategy blocks scrolling on the body only.
 * But Nebular has its own scrollable container - nb-layout. So, we need to block scrolling in it to.
 * */
@Injectable()
export class NbBlockScrollStrategyAdapter extends BlockScrollStrategy {
  protected scrollService = inject(NbLayoutScrollService);

  constructor() {
    const document = inject(NB_DOCUMENT);
    const viewportRuler = inject(NbViewportRulerAdapter);

    super(viewportRuler, document);
  }

  enable() {
    super.enable();
    this.scrollService.scrollable(false);
  }

  disable() {
    super.disable();
    this.scrollService.scrollable(true);
  }
}

@Injectable()
export class NbScrollStrategyOptions extends ScrollStrategyOptions {
  protected scrollService = inject(NbLayoutScrollService);
  protected scrollDispatcher: ScrollDispatcher;
  protected viewportRuler: NbViewportRulerAdapter;
  protected ngZone: NgZone;
  protected document;

  constructor() {
    const scrollDispatcher = inject(ScrollDispatcher);
    const viewportRuler = inject(NbViewportRulerAdapter);
    const ngZone = inject(NgZone);
    const document = inject(NB_DOCUMENT);

    super(scrollDispatcher, viewportRuler, ngZone, document);

    this.scrollDispatcher = scrollDispatcher;
    this.viewportRuler = viewportRuler;
    this.ngZone = ngZone;
    this.document = document;
  }

  block = () => new NbBlockScrollStrategyAdapter();
}

export type NbScrollStrategies = keyof Pick<NbScrollStrategyOptions, 'noop' | 'close' | 'block' | 'reposition'>;
