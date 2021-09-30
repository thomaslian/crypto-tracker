import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { sha256 } from 'js-sha256';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Coinbase
    if (request.url.includes(environment.coinbase.coinbaseApiUrl)) {

      const apiKey: string = environment.coinbase.apiKey;
      const apiSecret: string = environment.coinbase.apiSecret
      
      const timeStamp: string = this.getTimestamp();
      const method: string = request.method.toUpperCase();
      const requestPath: string = "/" + request.url.split('//')[2];
      // Generate a sha256 HMAC - required by Coinbase API
      const accessString: string = sha256.hmac(apiSecret, timeStamp + method + requestPath);

      request = request.clone({
        setHeaders: {
        "CB-ACCESS-KEY": apiKey,
        "CB-ACCESS-SIGN": accessString,
        "CB-ACCESS-TIMESTAMP": timeStamp
        },
        responseType: "json"
      });
      this.createConsoleLog(request.url, method);
    }
    // jsonplaceholder
    else if (request.url.includes("jsonplaceholder.typicode.com")) {
      this.createConsoleLog(request.url, request.method.toUpperCase());
    }
    return next.handle(request);
  }

  private createConsoleLog(url: string, method: string) {
    console.log(`Requesting ${method} to ${url}`);
  }


  /**
  * Get current UTC Timestamp
  * @returns UTC Timestamp as string
  */
  private getTimestamp(): string {
    return Math.ceil((new Date()).getTime() / 1000).toString();
  }
}
