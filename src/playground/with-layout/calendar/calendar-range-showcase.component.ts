/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

import { NbCalendarRange, NbDateService } from '@kisimedia/nebular-theme';

@Component({
  selector: 'nb-calendar-range-showcase',
  template: `
    <nb-card>
      <nb-card-header>
        <h1 class="h5">Selected range: {{ range.start | date }} - {{ range.end | date }}</h1>
      </nb-card-header>
      <nb-card-body>
        <nb-calendar-range [(range)]="range"></nb-calendar-range>
      </nb-card-body>
    </nb-card>
  `,
})
export class CalendarRangeShowcaseComponent {
  range: NbCalendarRange<Date>;

  constructor(protected dateService: NbDateService<Date>) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }
}
