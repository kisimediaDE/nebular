/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';

import { NbAuthService } from '../../services/auth.service';
import { NbAuthResult } from '../../services/auth-result';
import { NgIf, NgFor } from '@angular/common';
import { NbAlertModule, NbInputModule, NbCheckboxModule, NbButtonModule, NbIconModule } from '@kisimedia/nebular-theme';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'nb-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NbAlertModule,
    NgFor,
    FormsModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    RouterLink,
    NbIconModule,
  ],
})
export class NbRegisterComponent {
  protected service = inject(NbAuthService);
  protected options = inject(NB_AUTH_OPTIONS) ?? {};
  protected cd = inject(ChangeDetectorRef);
  protected router = inject(Router);

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  socialLinks: NbAuthSocialLink[] = [];

  constructor() {
    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
