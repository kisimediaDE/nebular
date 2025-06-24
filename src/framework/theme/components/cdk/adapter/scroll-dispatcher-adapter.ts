import { Injectable, NgZone, inject } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { merge, Observable } from 'rxjs';

import { NbPlatform } from '../platform/platform-service';
import { NbLayoutScrollService } from '../../../services/scroll.service';
import { NB_DOCUMENT } from '../../../theme.options';

@Injectable()
export class NbScrollDispatcherAdapter extends ScrollDispatcher {
  protected scrollService = inject(NbLayoutScrollService);

  constructor() {
    const ngZone = inject(NgZone);
    const platform = inject(NbPlatform);
    const document = inject(NB_DOCUMENT);

    super(ngZone, platform, document);
  }

  scrolled(auditTimeInMs?: number): Observable<CdkScrollable | void> {
    return merge(super.scrolled(auditTimeInMs), this.scrollService.onScroll());
  }
}
