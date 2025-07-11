/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbActionsModule, NbCardModule, NbLayoutModule, NbUserModule } from '@kisimedia/nebular-theme';
import { ActionRoutingModule } from './action-routing.module';
import { ActionBadgeComponent } from './action-badge.component';
import { ActionShowcaseComponent } from './action-showcase.component';
import { ActionSizesComponent } from './action-sizes.component';
import { ActionTestComponent } from './action-test.component';
import { ActionWidthComponent } from './action-width.component';
import { ActionDotModeComponent } from './action-dot-mode.component';

@NgModule({
  declarations: [
    ActionBadgeComponent,
    ActionShowcaseComponent,
    ActionSizesComponent,
    ActionTestComponent,
    ActionWidthComponent,
    ActionDotModeComponent,
  ],
  imports: [NbActionsModule, NbLayoutModule, NbCardModule, NbUserModule, ActionRoutingModule, CommonModule],
})
export class ActionModule {}
