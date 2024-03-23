import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    for (let host of environment.hosts) {
      if (req.url.startsWith(host.prefix)) {
        let newUrl = req.url.replace(host.prefix, host.target);
        req = req.clone({ url: newUrl });
      }
    }
    return next.handle(req);
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

