import { Injectable, Injector, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { NbAuthService } from '../auth.service';
import { NB_AUTH_INTERCEPTOR_HEADER } from '../../auth.options';
import { NbAuthToken } from '../token/token';

@Injectable()
export class NbAuthSimpleInterceptor implements HttpInterceptor {
  private injector = inject(Injector);
  protected headerName = inject(NB_AUTH_INTERCEPTOR_HEADER) ?? 'Authorization';

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      switchMap((token: NbAuthToken) => {
        if (token && token.getValue()) {
          req = req.clone({
            setHeaders: {
              [this.headerName]: token.getValue(),
            },
          });
        }
        return next.handle(req);
      }),
    );
  }

  protected get authService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }
}
