import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { sha256 } from 'js-sha256';
import { Observable, Observer } from 'rxjs';
import { ExchangeWallet } from '../interfaces/exchange-wallet';

@Injectable({
  providedIn: 'root'
})
export class CoinbaseService {

  coinbaseApiUrl: string = 'https://api.coinbase.com/';
  apiKey: string = environment.coinbase.apiKey;
  apiSecret: string = environment.coinbase.apiSecret;

  constructor(private http: HttpClient) { }

  getAccountDetails(): Observable<ExchangeWallet[]> {
    const timeStamp = this.getTimestamp();
    const method: string = "GET";
    const requestPath: string = `/v2/accounts?&limit=100`;
    const cbAccessString: string = sha256.hmac(this.apiSecret, timeStamp + method + requestPath);
    return new Observable((observer: Observer<ExchangeWallet[]>) => {
      this.http.get(this.coinbaseApiUrl + requestPath, { headers: { "CB-ACCESS-KEY": this.apiKey, "CB-ACCESS-SIGN": cbAccessString, "CB-ACCESS-TIMESTAMP": timeStamp } }).subscribe((accounts: any) => {
        const wallets: ExchangeWallet[] = accounts.data.filter(wallet => wallet.balance.amount > 0)
          .map(wallet => {
            return {
              id: wallet.id,
              name: wallet.name,
              amount: wallet.balance.amount,
              currency: wallet.balance.currency,
              native_amount: wallet.native_balance.amount,
              native_currency: wallet.native_balance.currency
            }
          });
        console.log(wallets);
        observer.next(wallets)
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
