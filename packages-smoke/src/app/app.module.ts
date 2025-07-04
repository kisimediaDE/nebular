import { NgModule } from '@angular/core';
import { BrowserModule, REMOVE_STYLES_ON_COMPONENT_DESTROY } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule } from '@kisimedia/nebular-theme';
import { NbAuthModule } from '@kisimedia/nebular-auth';
import { NbSecurityModule } from '@kisimedia/nebular-security';
import { NbMomentDateModule } from '@kisimedia/nebular-moment';
import { NbDateFnsDateModule } from '@kisimedia/nebular-date-fns';
import { NbEvaIconsModule } from '@kisimedia/nebular-eva-icons';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbAuthModule.forRoot(),
    NbSecurityModule.forRoot(),
    NbMomentDateModule,
    NbDateFnsDateModule,
    NbEvaIconsModule,
  ],
  providers: [
    {
      provide: REMOVE_STYLES_ON_COMPONENT_DESTROY,
      useValue: false,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
