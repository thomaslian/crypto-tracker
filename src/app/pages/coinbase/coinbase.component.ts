import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExchangeWallet } from 'src/app/models/exchange-wallet';
import { TableHeader } from 'src/app/models/table-header';
import { CoinbaseService } from 'src/app/services/coinbase.service';

@Component({
  selector: 'app-coinbase',
  templateUrl: './coinbase.component.html',
  styleUrls: ['./coinbase.component.css']
})
export class CoinbaseComponent implements OnInit {

  subscription: Subscription;
  tableHeaders: TableHeader[] = [
    { field: "name", header: "Name", sort: true },
    { field: "amount", header: "Amount", sort: true },
    { field: "currency", header: "Currency", sort: false },
    { field: "native_amount", header: "Native amount", sort: true },
    { field: "native_currency", header: "Native currency", sort: false },];
  wallets: ExchangeWallet[] = [];
  nativeCurrency: string = "";
  nativeBalance: number = 0;

  constructor(private coinbase: CoinbaseService) { }

  ngOnInit(): void {
    this.subscription = this.coinbase.getActiveAccounts().subscribe(wallets => {
      this.nativeCurrency = wallets[0].native_balance.currency; // Get the native currency
      this.wallets = wallets.map(wallet => {
        const nativeAmount = parseFloat(wallet.native_balance.amount);
        this.nativeBalance += nativeAmount; // Calculate the total native balance

        return {
          id: wallet.id,
          name: wallet.name,
          amount: parseFloat(wallet.balance.amount),
          currency: wallet.balance.currency,
          native_amount: nativeAmount,
          native_currency: wallet.native_balance.currency
        }
      }).sort((a, b) => {
        return b.native_amount - a.native_amount; // Sort the wallets by native amount
      })
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
}
