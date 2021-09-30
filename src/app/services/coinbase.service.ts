import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Observer } from 'rxjs';
import { ExchangeWallet } from '../interfaces/exchange-wallet';

@Injectable({
  providedIn: 'root'
})

export class CoinbaseService {

  coinbaseApiUrl: string = environment.coinbase.coinbaseApiUrl;

  constructor(private http: HttpClient) { }

  getActiveWallets(): Observable<ExchangeWallet[]> {
    const requestPath: string = `/v2/accounts?&limit=100`;

    return new Observable((observer: Observer<ExchangeWallet[]>) => {
      this.http.get(this.coinbaseApiUrl + requestPath).subscribe((accounts: any) => {
        const wallets: ExchangeWallet[] =
          accounts.data
            .filter(wallet => wallet.id.length === 36) // Only get wallets that are active (That have an active ID)
            .map(wallet => {
              return {
                id: wallet.id,
                name: wallet.name,
                amount: parseFloat(wallet.balance.amount),
                currency: wallet.balance.currency,
                native_amount: parseFloat(wallet.native_balance.amount),
                native_currency: wallet.native_balance.currency
              }
            });
        observer.next(wallets);
        observer.complete();
      });
    });
  }
}
