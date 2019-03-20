import { Injectable } from '@angular/core';
const apiVersion = 'http://127.0.0.1:8080/';
let headers = new Headers({ 'Content-Type': 'application/json' });

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${this.auth.get('token')}`) });
    req = req.clone({ url: apiVersion + req.url });
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    return next.handle(req);
  }
} 