import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { sha256 } from 'js-sha256';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinbaseService {

  coinbaseApiUrl: string = 'https://api.coinbase.com/';
  apiKey: string = environment.coinbase.apiKey;
  apiSecret: string = environment.coinbase.apiSecret;

  constructor(private http: HttpClient) { }

  getAccountDetails(): Observable<Array<any>> {
    const timeStamp = this.getTimestamp();
    const method: string = "GET";
    const requestPath: string = `/v2/accounts`;
    const cbAccessString: string = sha256.hmac(this.apiSecret, timeStamp + method + requestPath);
    return new Observable((observer: Observer<any>) => {
      this.http.get(this.coinbaseApiUrl + requestPath, { headers: { "CB-ACCESS-KEY": this.apiKey, "CB-ACCESS-SIGN": cbAccessString, "CB-ACCESS-TIMESTAMP": timeStamp } }).subscribe((accounts: any) => {
        observer.next(accounts.data)
        observer.complete();
      }, error => {
        console.log("Could not get data from Coinbase");
        observer.error(error);
      });
    });
  }


  /**
 * Get current UTC Timestamp
 * @returns UTC Timestamp as string
 */
  private getTimestamp(): string {
    return Math.ceil((new Date()).getTime() / 1000).toString();
  }
}
