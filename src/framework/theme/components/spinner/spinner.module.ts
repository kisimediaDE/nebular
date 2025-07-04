/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbSpinnerComponent } from './spinner.component';
import { NbSpinnerDirective } from './spinner.directive';

@NgModule({
  imports: [NbSharedModule, NbSpinnerComponent, NbSpinnerDirective],
  exports: [NbSpinnerComponent, NbSpinnerDirective],
})
export class NbSpinnerModule {}
