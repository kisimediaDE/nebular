/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NB_AUTH_OPTIONS } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';
import { NbAuthService } from '../../services/auth.service';
import { NbAuthResult } from '../../services/auth-result';

@Component({
  selector: 'nb-logout',
  templateUrl: './logout.component.html',
})
export class NbLogoutComponent implements OnInit {
  protected service = inject(NbAuthService);
  protected options = inject(NB_AUTH_OPTIONS) ?? {};
  protected router = inject(Router);

  redirectDelay: number = 0;
  strategy: string = '';

  constructor() {
    this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.strategy = this.getConfigValue('forms.logout.strategy');
  }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void {
    this.service.logout(strategy).subscribe((result: NbAuthResult) => {
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
