/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input } from '@angular/core';

import { NbStatusService } from '../../services/status.service';
import { NbComponentOrCustomStatus } from '../component-status';
import { convertToBoolProperty } from '../helpers';

export type NbBadgePhysicalPosition =
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  | 'center right'
  | 'center left';
export type NbBadgeLogicalPosition =
  | 'top start'
  | 'top end'
  | 'bottom start'
  | 'bottom end'
  | 'center start'
  | 'center end';
export type NbBadgePosition = NbBadgePhysicalPosition | NbBadgeLogicalPosition;

export interface NbBadge {
  text?: string;
  position?: NbBadgePosition;
  status?: NbComponentOrCustomStatus;
  dotMode?: boolean;
}

/**
 * Badge is a simple labeling component.
 * It can be used to add additional information to any content or highlight unread items.
 *
 * Element is absolute positioned, so parent should be
 * [positioned element](https://developer.mozilla.org/en-US/docs/Web/CSS/position).
 * It means parent `position` should be set to anything except `static`, e.g. `relative`,
 * `absolute`, `fixed`, or `sticky`.
 *
 * ### Installation
 *
 * Import `NbBadgeModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbBadgeModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Badge with default position and status(color):
 *
 * ```html
 * <nb-badge text="badgeText"></nb-badge>
 * ```
 *
 * For example, badge can be placed into nb-card header:
 * @stacked-example(Showcase, badge/badge-showcase.component)
 *
 * Badge located on the bottom right with warning status:
 *
 * ```html
 * <nb-badge text="badgeText" status="warning" position="bottom right">
 * </nb-badge>
 * ```
 *
 * @styles
 *
 * badge-border-radius:
 * badge-text-font-family:
 * badge-text-font-size:
 * badge-text-font-weight:
 * badge-text-line-height:
 * badge-padding:
 * badge-basic-background-color:
 * badge-basic-text-color:
 * badge-primary-background-color:
 * badge-primary-text-color:
 * badge-success-background-color:
 * badge-success-text-color:
 * badge-info-background-color:
 * badge-info-text-color:
 * badge-warning-background-color:
 * badge-warning-text-color:
 * badge-danger-background-color:
 * badge-danger-text-color:
 * badge-control-background-color:
 * badge-control-text-color:
 */
@Component({
  selector: 'nb-badge',
  styleUrls: ['./badge.component.scss'],
  template: `{{ dotMode ? '' : text }}`,
  standalone: false,
})
export class NbBadgeComponent implements NbBadge {
  /**
   * Text to display
   * @type string
   */
  @Input() text: string = '';

  /**
   * Badge position
   *
   * Can be set to any class or to one of predefined positions:
   * 'top left', 'top right', 'bottom left', 'bottom right',
   * 'top start', 'top end', 'bottom start', 'bottom end'
   * @type string
   */
  @Input()
  get position(): NbBadgePosition {
    return this._position;
  }
  set position(value: NbBadgePosition) {
    this._position = value || this._defaultPosition;
  }
  protected _defaultPosition: NbBadgePosition = 'top right';
  protected _position: NbBadgePosition = this._defaultPosition;

  /**
   * Shows badge as a dot. No text is shown.
   * @type boolean
   */
  @Input()
  @HostBinding('class.dot-mode')
  get dotMode(): boolean {
    return this._dotMode;
  }
  set dotMode(value: boolean) {
    this._dotMode = convertToBoolProperty(value);
  }
  protected _dotMode: boolean;

  /**
   * Badge status (adds specific styles):
   * 'basic', 'primary', 'info', 'success', 'warning', 'danger', 'control'
   */
  @Input() status: NbComponentOrCustomStatus = 'basic';

  @HostBinding('class')
  get additionalClasses(): string[] {
    if (this.statusService.isCustomStatus(this.status)) {
      return [this.statusService.getStatusClass(this.status)];
    }
    return [];
  }

  @HostBinding('class.status-primary')
  get primary(): boolean {
    return this.status === 'primary';
  }

  @HostBinding('class.status-success')
  get success(): boolean {
    return this.status === 'success';
  }

  @HostBinding('class.status-info')
  get info(): boolean {
    return this.status === 'info';
  }

  @HostBinding('class.status-warning')
  get warning(): boolean {
    return this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger(): boolean {
    return this.status === 'danger';
  }

  @HostBinding('class.status-basic')
  get basic(): boolean {
    return this.status === 'basic';
  }

  @HostBinding('class.status-control')
  get control(): boolean {
    return this.status === 'control';
  }

  @HostBinding('class.position-top')
  get top(): boolean {
    return this.position.includes('top');
  }

  @HostBinding('class.position-right')
  get right(): boolean {
    return this.position.includes('right');
  }

  @HostBinding('class.position-bottom')
  get bottom(): boolean {
    return this.position.includes('bottom');
  }

  @HostBinding('class.position-left')
  get left(): boolean {
    return this.position.includes('left');
  }

  @HostBinding('class.position-start')
  get start(): boolean {
    return this.position.includes('start');
  }

  @HostBinding('class.position-end')
  get end(): boolean {
    return this.position.includes('end');
  }

  @HostBinding('class.position-center')
  get center(): boolean {
    return this.position.includes('center');
  }

  constructor(protected statusService: NbStatusService) {}
}
