import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { environment } from "src/environments/environment.development";

export class ApiInterceptor implements HttpInterceptor {
    private apiUrl: string = environment.hosts[0].target;

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const modifiedReq = req.clone({ url: `${this.apiUrl}${req.url}` });
        return next.handle(modifiedReq);
    }
}