import { ComponentRef, Injectable, TemplateRef, Type, inject } from '@angular/core';

import { NbComponentPortal, NbComponentType, NbOverlay, NbOverlayConfig, NbOverlayRef } from './mapping';
import { NbScrollStrategyOptions } from '../adapter/block-scroll-strategy-adapter';
import { NbLayoutDirectionService } from '../../../services/direction.service';

export type NbOverlayContent = Type<any> | TemplateRef<any> | string;

export function patch<T>(container: ComponentRef<T>, containerContext: Object): ComponentRef<T> {
  Object.assign(container.instance, containerContext);
  container.changeDetectorRef.detectChanges();
  return container;
}

export function createContainer<T>(ref: NbOverlayRef, container: NbComponentType<T>, context: Object): ComponentRef<T> {
  const containerRef = ref.attach(new NbComponentPortal(container));
  patch(containerRef, context);
  return containerRef;
}

@Injectable()
export class NbOverlayService {
  protected overlay = inject(NbOverlay);
  protected layoutDirection = inject(NbLayoutDirectionService);

  constructor() {}

  get scrollStrategies(): NbScrollStrategyOptions {
    return this.overlay.scrollStrategies;
  }

  create(config?: NbOverlayConfig): NbOverlayRef {
    const overlayRef = this.overlay.create(config);
    this.layoutDirection.onDirectionChange().subscribe((dir) => overlayRef.setDirection(dir));
    return overlayRef;
  }
}
