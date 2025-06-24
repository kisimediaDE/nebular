/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable, LOCALE_ID, inject } from '@angular/core';

import { NB_DATE_SERVICE_OPTIONS, NbNativeDateService } from '@kisimedia/nebular-theme';

import { parse, format as formatDateFns, getWeek, ParseOptions, FormatOptions, GetWeekOptions } from 'date-fns';

export interface NbDateFnsOptions {
  format: string;
  parseOptions: ParseOptions;
  formatOptions: FormatOptions;
  getWeekOptions: GetWeekOptions;
}

@Injectable()
export class NbDateFnsDateService extends NbNativeDateService {
  protected options: Partial<NbDateFnsOptions>;

  constructor() {
    const locale = inject(LOCALE_ID);
    const options = inject(NB_DATE_SERVICE_OPTIONS, { optional: true })!;

    super();
    this.options = options || {};
  }

  format(date: Date, format: string): string {
    if (date) {
      return formatDateFns(date, format || this.options.format, this.options.formatOptions);
    }

    return '';
  }

  parse(date: string, format: string): Date {
    return parse(date, format || this.options.format, new Date(), this.options.parseOptions);
  }

  getId(): string {
    return 'date-fns';
  }

  getWeekNumber(date: Date): number {
    return getWeek(date, this.options.getWeekOptions);
  }

  getDateFormat(): string {
    return 'yyyy-MM-dd';
  }
}
