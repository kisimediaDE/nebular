/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy, inject } from '@angular/core';
import { Location } from '@angular/common';

import { NbAuthService } from '../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbLayoutModule, NbCardModule, NbIconModule } from '@kisimedia/nebular-theme';
import { NbAuthBlockComponent } from './auth-block/auth-block.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'nb-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-header>
            <nav class="navigation">
              <a href="#" (click)="back()" class="link back-link" aria-label="Back">
                <nb-icon icon="arrow-back"></nb-icon>
              </a>
            </nav>
          </nb-card-header>
          <nb-card-body>
            <nb-auth-block>
              <router-outlet></router-outlet>
            </nb-auth-block>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
  imports: [NbLayoutModule, NbCardModule, NbIconModule, NbAuthBlockComponent, RouterOutlet],
})
export class NbAuthComponent implements OnDestroy {
  protected auth = inject(NbAuthService);
  protected location = inject(Location);

  private destroy$ = new Subject<void>();

  subscription: any;

  authenticated: boolean = false;
  token: string = '';

  // showcase of how to use the onAuthenticationChange method
  constructor() {
    const auth = this.auth;

    this.subscription = auth
      .onAuthenticationChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }

  back() {
    this.location.back();
    return false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
