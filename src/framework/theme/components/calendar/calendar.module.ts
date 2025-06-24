/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbCalendarComponent } from './calendar.component';
import { NbBaseCalendarModule } from './base-calendar.module';

@NgModule({
  imports: [NbBaseCalendarModule, NbCalendarComponent],
  exports: [NbCalendarComponent],
})
export class NbCalendarModule {}
