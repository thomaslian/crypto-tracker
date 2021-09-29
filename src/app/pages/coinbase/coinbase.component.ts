import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExchangeWallet } from 'src/app/interfaces/exchange-wallet';
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
  wallets: ExchangeWallet[] = [];

  constructor(private coinbase: CoinbaseService) { }

  ngOnInit(): void {
    this.subscription = this.coinbase.getAccountDetails().subscribe((coinbaseWallets: ExchangeWallet[]) => {
      this.wallets = coinbaseWallets;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
