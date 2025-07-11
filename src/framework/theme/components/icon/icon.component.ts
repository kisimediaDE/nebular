/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { NbStatusService } from '../../services/status.service';
import { NbComponentOrCustomStatus } from '../component-status';
import { NbIconLibraries } from './icon-libraries';

export interface NbIconConfig {
  icon: string;
  pack?: string;
  status?: NbComponentOrCustomStatus;
  options?: { [name: string]: any };
}

/**
 * Icon component. Allows to render both `svg` and `font` icons.
 * Starting from Nebular 4.0 uses [Eva Icons](https://akveo.github.io/eva-icons/) pack by default.
 *
 * Basic icon example:
 * @stacked-example(Showcase, icon/icon-showcase.component)
 *
 * Icon configuration:
 *
 * ```html
 * <nb-icon icon="star"></nb-icon>
 * ```
 * ### Installation
 *
 * By default Nebular comes without any pre-installed icon pack.
 * Starting with Nebular 4.0.0 we ship separate package called `@kisimedia/nebular-eva-icons`
 * which integrates SVG [Eva Icons](https://akveo.github.io/eva-icons/) pack to Nebular. To add it to your
 * project run:
 * ```sh
 * npm i eva-icons @kisimedia/nebular-eva-icons
 * ```
 * This command will install Eva Icons pack. Then register `NbEvaIconsModule` into your app module:
 * ```ts
 * import { NbEvaIconsModule } from '@kisimedia/nebular-eva-icons';
 *
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbEvaIconsModule,
 *   ],
 * })
 * export class AppModule { }
 * ```
 * Last thing, import `NbIconModule` to your feature module where you need to show an icon:
 * ```ts
 * import { NbIconModule } from '@kisimedia/nebular-theme';
 *
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbIconModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Icon can be colored using `status` input:
 * ```html
 * <nb-icon icon="star" status="warning"></nb-icon>
 * ```
 *
 * Colored icons:
 * @stacked-example(Colored Icons, icon/icon-colors.component)
 *
 * In case you need to specify an icon from a specific icon pack, this could be done using `pack` input property:
 * ```html
 * <nb-icon icon="star" pack="font-awesome"></nb-icon>
 * ```
 * Additional icon settings (if available by the icon pack) could be passed using `options` input:
 *
 * ```html
 * <nb-icon icon="star" [options]="{ animation: { type: 'zoom' } }"></nb-icon>
 * ```
 *
 * @styles
 *
 * icon-font-size:
 * icon-line-height:
 * icon-width:
 * icon-height:
 * icon-svg-vertical-align:
 * icon-basic-color:
 * icon-primary-color:
 * icon-info-color:
 * icon-success-color:
 * icon-warning-color:
 * icon-danger-color:
 * icon-control-color:
 */
@Component({
  selector: 'nb-icon',
  styleUrls: [`./icon.component.scss`],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NbIconComponent implements NbIconConfig, OnChanges, OnInit {
  protected iconDef;
  protected prevClasses = [];

  @HostBinding('innerHtml')
  html: SafeHtml = '';

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === 'primary';
  }

  @HostBinding('class.status-info')
  get info() {
    return this.status === 'info';
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === 'success';
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === 'danger';
  }

  @HostBinding('class.status-basic')
  get basic() {
    return this.status === 'basic';
  }

  @HostBinding('class.status-control')
  get control() {
    return this.status === 'control';
  }

  @HostBinding('class')
  get additionalClasses(): string[] {
    if (this.statusService.isCustomStatus(this.status)) {
      return [this.statusService.getStatusClass(this.status)];
    }
    return [];
  }

  /**
   * Icon name
   * @param {string} status
   */
  @Input() icon: string;

  /**
   * Icon pack name
   * @param {string} status
   */
  @Input() pack: string;

  /**
   * Additional icon settings
   * @param {[name: string]: any}
   */
  @Input() options: { [name: string]: any };

  /**
   * Icon status (adds specific styles):
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
   */
  @Input() status?: NbComponentOrCustomStatus;

  /**
   * Sets all icon configurable properties via config object.
   * If passed value is a string set icon name.
   * @docs-private
   */
  @Input()
  get config(): string | NbIconConfig {
    return this._config;
  }
  set config(value: string | NbIconConfig) {
    if (!value) {
      return;
    }

    this._config = value;

    if (typeof value === 'string') {
      this.icon = value;
    } else {
      this.icon = value.icon;
      this.pack = value.pack;
      this.status = value.status;
      this.options = value.options;
    }
  }
  protected _config: string | NbIconConfig;

  constructor(
    protected sanitizer: DomSanitizer,
    protected iconLibrary: NbIconLibraries,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected statusService: NbStatusService,
  ) {}

  ngOnInit() {
    this.iconDef = this.renderIcon(this.icon, this.pack, this.options);
  }

  ngOnChanges() {
    const iconDef = this.iconLibrary.getIcon(this.icon, this.pack);
    if (iconDef) {
      this.renderIcon(this.icon, this.pack, this.options);
    } else {
      this.clearIcon();
    }
  }

  renderIcon(name: string, pack?: string, options?: { [name: string]: any }) {
    const iconDefinition = this.iconLibrary.getIcon(name, pack);

    if (!iconDefinition) {
      return undefined;
    }

    const content = iconDefinition.icon.getContent(options);
    if (content) {
      this.html = this.sanitizer.bypassSecurityTrustHtml(content);
    }

    this.assignClasses(iconDefinition.icon.getClasses(options));
    return iconDefinition;
  }

  protected clearIcon(): void {
    this.html = '';
    this.assignClasses([]);
  }

  protected assignClasses(classes: string[]) {
    this.prevClasses.forEach((className: string) => {
      this.renderer.removeClass(this.el.nativeElement, className);
    });

    classes.forEach((className: string) => {
      this.renderer.addClass(this.el.nativeElement, className);
    });

    this.prevClasses = classes;
  }
}
