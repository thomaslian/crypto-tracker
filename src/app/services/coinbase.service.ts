import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CoinbaseService {

  coinbaseApiUrl: string = environment.coinbase.coinbaseApiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all accounts that are currently in use or previously used.
   * One account is usually one type of coin
   * @returns An array of Accounts as an Observable
   */
  getActiveAccounts(): Observable<Accounts[]> {
    return this.http.get<Accounts>(this.coinbaseApiUrl + '/v2/accounts?&limit=100')
      .pipe(map((res: any) => res.data.filter(wallet => wallet.id.length === 36))); // Wallets that are currently in use/previously used have an id length of 36
  }
}


export interface Accounts {
  id: string,
  name: string,
  primary: boolean,
  type: string,
  currency: string,
  balance: {
      amount: string,
      currency: string
  },
  created_at: string,
  updated_at: string,
  resource: string,
  resource_path: string,
  native_balance: {
    amount: string,
    currency: string
  }
}
