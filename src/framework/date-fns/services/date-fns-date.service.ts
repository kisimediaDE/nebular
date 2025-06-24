/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';

import { NB_DATE_SERVICE_OPTIONS, NbNativeDateService } from '@nebular/theme';

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

  constructor(@Inject(LOCALE_ID) locale: string, @Optional() @Inject(NB_DATE_SERVICE_OPTIONS) options) {
    super(locale);
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
