import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoinbaseWallet } from 'src/app/interfaces/coinbase-wallet';
import { TableHeader } from 'src/app/interfaces/table-header';
import { CoinbaseService } from 'src/app/services/coinbase.service';

@Component({
  selector: 'app-coinbase',
  templateUrl: './coinbase.component.html',
  styleUrls: ['./coinbase.component.css']
})
export class CoinbaseComponent implements OnInit {

  subscription: Subscription;
  tableHeaders: TableHeader[] = [
    { field: "id", header: "ID" },
    { field: "name", header: "Name" },
    { field: "amount", header: "Amount" },
    { field: "currency", header: "Currency" },
    { field: "native_amount", header: "Native amount" },
    { field: "native_currency", header: "Native currency" },];
  wallets: CoinbaseWallet[] = [];

  constructor(private coinbase: CoinbaseService) { }

  ngOnInit(): void {
    this.subscription = this.coinbase.getAccountDetails().subscribe((res: any[]) => {
      console.log(res);
      res.forEach(wallet => {
        this.wallets.push({
          id: wallet.id,
          name: wallet.name,
          amount: wallet.balance.amount,
          currency: wallet.balance.currency,
          native_amount: wallet.native_balance.amount,
          native_currency: wallet.native_balance.currency
        });
      })
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
