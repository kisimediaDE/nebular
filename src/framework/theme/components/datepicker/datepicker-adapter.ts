/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable, Type, inject } from '@angular/core';

import { NbCalendarRange } from '../calendar/calendar-range.component';
import { NbDatepickerComponent, NbRangepickerComponent } from './datepicker.component';
import { NbDatepickerAdapter } from './datepicker.directive';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NbDateTimePickerComponent } from './date-timepicker.component';

@Injectable()
export class NbDateAdapterService<D> extends NbDatepickerAdapter<D> {
  protected dateService = inject<NbDateService<D>>(NbDateService);

  picker: Type<NbDatepickerComponent<D>> = NbDatepickerComponent;

  constructor() {
    super();
  }

  parse(date: string, format): D {
    return this.dateService.parse(date, format);
  }

  format(date: D, format: string): string {
    return this.dateService.format(date, format);
  }

  isValid(date: string, format: string): boolean {
    return this.dateService.isValidDateString(date, format);
  }
}

@Injectable()
export class NbRangeAdapterService<D> extends NbDatepickerAdapter<NbCalendarRange<D>> {
  protected dateService = inject<NbDateService<D>>(NbDateService);

  picker: Type<NbRangepickerComponent<D>> = NbRangepickerComponent;

  constructor() {
    super();
  }

  parse(range: string, format): NbCalendarRange<D> {
    const [start, end] = range.split('-').map((subDate) => subDate.trim());
    return {
      start: this.dateService.parse(start, format),
      end: this.dateService.parse(end, format),
    };
  }

  format(range: NbCalendarRange<D>, format: string): string {
    if (!range) {
      return '';
    }

    const start = this.dateService.format(range.start, format);
    const isStartValid = this.dateService.isValidDateString(start, format);

    if (!isStartValid) {
      return '';
    }

    const end = this.dateService.format(range.end, format);
    const isEndValid = this.dateService.isValidDateString(end, format);

    if (isEndValid) {
      return `${start} - ${end}`;
    } else {
      return start;
    }
  }

  isValid(range: string, format: string): boolean {
    const [start, end] = range.split('-').map((subDate) => subDate.trim());
    return this.dateService.isValidDateString(start, format) && this.dateService.isValidDateString(end, format);
  }
}

@Injectable()
export class NbDateTimeAdapterService<D> extends NbDatepickerAdapter<D> {
  protected dateService = inject<NbDateService<D>>(NbDateService);

  picker: Type<NbDateTimePickerComponent<D>> = NbDateTimePickerComponent;

  constructor() {
    super();
  }

  parse(date: string, format: string): D {
    return this.dateService.parse(date, format);
  }

  format(date: any, format: string): string {
    return this.dateService.format(date, format);
  }

  isValid(date: string, format: string): boolean {
    return this.dateService.isValidDateString(date, format);
  }
}
