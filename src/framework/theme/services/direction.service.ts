import { InjectionToken, Injectable, inject } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { share } from 'rxjs/operators';

/**
 * Layout direction.
 * */
export enum NbLayoutDirection {
  LTR = 'ltr',
  RTL = 'rtl',
}

/**
 * Layout direction setting injection token.
 * */
export const NB_LAYOUT_DIRECTION = new InjectionToken<NbLayoutDirection>('Layout direction');

/**
 * Layout Direction Service.
 * Allows to set or get layout direction and listen to its changes
 */
@Injectable()
export class NbLayoutDirectionService {
  private direction = inject(NB_LAYOUT_DIRECTION, { optional: true })! ?? NbLayoutDirection.LTR;

  private $directionChange = new ReplaySubject<NbLayoutDirection>(1);

  constructor() {
    const direction = this.direction;

    this.setDirection(direction);
  }

  /**
   * Returns true if layout direction set to left to right.
   * @returns boolean.
   * */
  public isLtr(): boolean {
    return this.direction === NbLayoutDirection.LTR;
  }

  /**
   * Returns true if layout direction set to right to left.
   * @returns boolean.
   * */
  public isRtl(): boolean {
    return this.direction === NbLayoutDirection.RTL;
  }

  /**
   * Returns current layout direction.
   * @returns NbLayoutDirection.
   * */
  getDirection(): NbLayoutDirection {
    return this.direction;
  }

  /**
   * Sets layout direction
   * @param {NbLayoutDirection} direction
   */
  setDirection(direction: NbLayoutDirection) {
    this.direction = direction;
    this.$directionChange.next(direction);
  }

  /**
   * Triggered when direction was changed.
   * @returns Observable<NbLayoutDirection>.
   */
  onDirectionChange(): Observable<NbLayoutDirection> {
    return this.$directionChange.pipe(share<NbLayoutDirection>());
  }
}
