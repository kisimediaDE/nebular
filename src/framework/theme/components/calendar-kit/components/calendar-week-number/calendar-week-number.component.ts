/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';

import { NbDateService } from '../../services/date.service';
import { NbCalendarSize, NbCalendarSizeValues } from '../../model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'nb-calendar-week-numbers',
  template: `
    <div class="sign-container">
      <div class="sign">{{ weekNumberSymbol }}</div>
    </div>
    <div class="week-number" *ngFor="let weekNumber of weekNumbers">{{ weekNumber }}</div>
  `,
  styleUrls: ['./calendar-week-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor],
})
export class NbCalendarWeekNumberComponent<D> implements OnChanges {
  private dateService = inject<NbDateService<D>>(NbDateService);

  weekNumbers: number[];

  @Input()
  weeks: D[][];

  @Input()
  size: NbCalendarSize;
  static ngAcceptInputType_size: NbCalendarSizeValues;

  /**
   * Sets symbol used as a header for week numbers column
   * */
  @Input() weekNumberSymbol: string;

  @HostBinding('class.size-large')
  get isLarge() {
    return this.size === NbCalendarSize.LARGE;
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.weeks) {
      this.weekNumbers = this.getWeeks();
    }
  }

  getWeeks(): number[] {
    return this.weeks.map((week: D[]) => {
      // Find last defined day as week could contain null days in case
      // boundingMonth set to false
      const lastDay = [...week].reverse().find((day: D) => !!day);
      // Use last day of the week to determine week number.
      // This way weeks which span between sibling years is marked first
      return this.dateService.getWeekNumber(lastDay);
    });
  }
}
