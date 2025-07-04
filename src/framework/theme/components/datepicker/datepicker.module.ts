/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NB_DATE_ADAPTER, NbDatepickerDirective } from './datepicker.directive';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbCalendarModule } from '../calendar/calendar.module';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbDatepickerContainerComponent } from './datepicker-container.component';
import { NbDatepickerComponent, NbRangepickerComponent, NbBasePickerComponent } from './datepicker.component';
import { NbCalendarRangeComponent } from '../calendar/calendar-range.component';
import { NbCalendarRangeModule } from '../calendar/calendar-range.module';
import { NbDateAdapterService, NbDateTimeAdapterService, NbRangeAdapterService } from './datepicker-adapter';
import { NbCalendarWithTimeComponent } from './calendar-with-time.component';
import { NbCardModule } from '../card/card.module';
import { NbBaseCalendarModule } from '../calendar/base-calendar.module';
import { NbTimepickerModule } from '../timepicker/timepicker.module';
import { NbCalendarKitModule } from '../calendar-kit/calendar-kit.module';
import { NbDateTimePickerComponent } from './date-timepicker.component';

@NgModule({
  imports: [
    NbOverlayModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbCardModule,
    NbBaseCalendarModule,
    NbTimepickerModule,
    NbCalendarKitModule,
    NbDatepickerDirective,
    NbDatepickerContainerComponent,
    NbCalendarWithTimeComponent,
    NbDateTimePickerComponent,
    NbDatepickerComponent,
    NbRangepickerComponent,
    NbBasePickerComponent,
  ],
  exports: [
    NbDatepickerDirective,
    NbDatepickerComponent,
    NbRangepickerComponent,
    NbDateTimePickerComponent,
    NbCalendarWithTimeComponent,
  ],
})
export class NbDatepickerModule {
  static forRoot(): ModuleWithProviders<NbDatepickerModule> {
    return {
      ngModule: NbDatepickerModule,
      providers: [
        DatePipe,
        {
          provide: NB_DATE_ADAPTER,
          multi: true,
          useClass: NbDateAdapterService,
        },
        {
          provide: NB_DATE_ADAPTER,
          multi: true,
          useClass: NbRangeAdapterService,
        },
        {
          provide: NB_DATE_ADAPTER,
          multi: true,
          useClass: NbDateTimeAdapterService,
        },
      ],
    };
  }
}
