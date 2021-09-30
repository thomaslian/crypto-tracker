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
    { field: "id", header: "ID", sort: false },
    { field: "name", header: "Name", sort: false },
    { field: "amount", header: "Amount", sort: true },
    { field: "currency", header: "Currency", sort: false },
    { field: "native_amount", header: "Native amount", sort: true },
    { field: "native_currency", header: "Native currency", sort: false },];
  wallets: ExchangeWallet[] = [];

  constructor(private coinbase: CoinbaseService) { }

  ngOnInit(): void {
    this.subscription = this.coinbase.getActiveAccounts().subscribe(wallets =>
      this.wallets = wallets.map(wallet => {
        return {
          id: wallet.id,
          name: wallet.name,
          amount: parseFloat(wallet.balance.amount),
          currency: wallet.balance.currency,
          native_amount: parseFloat(wallet.native_balance.amount),
          native_currency: wallet.native_balance.currency
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
