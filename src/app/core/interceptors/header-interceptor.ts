import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('rippleToken')) {
    req = req.clone({
      setHeaders: {
        AUTHORIZATION: `Bearer ${localStorage.getItem('rippleToken')}`,
      },
    });
  }
  return next(req);
};
