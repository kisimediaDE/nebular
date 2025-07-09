import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NbAuthService, NbAuthJWTToken, NbAuthToken } from '@kisimedia/nebular-auth';
import { NbRoleProvider } from '@kisimedia/nebular-security';

@Injectable()
export class CustomRoleProvider implements NbRoleProvider {
  constructor(private authService: NbAuthService) {}

  getRole(): Observable<string> {
    return this.authService.onTokenChange().pipe(
      map((token: NbAuthToken) => {
        if (token instanceof NbAuthJWTToken && token.isValid()) {
          return token.getPayload().role;
        }
        return 'guest';
      }),
    );
  }
}
