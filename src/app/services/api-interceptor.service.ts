import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    for (const host of environment.hosts) {
      if (request.url.startsWith(host.prefix)) {
        const newUrl = request.url.replace(host.prefix, host.target);
        request = request.clone({ url: newUrl });
        // break; 
      }
    }
    return next.handle(request);
  }
}

// import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { environment } from "src/environments/environment.development";

// export class ApiInterceptor implements HttpInterceptor {
//     private apiUrl: string = environment.hosts[0].target;

//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//         const modifiedReq = req.clone({ url: `${this.apiUrl}${req.url}` });
//         return next.handle(modifiedReq);
//     }
// }

