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
    { field: "id", header: "ID", sort: false },
    { field: "name", header: "Name", sort: false},
    { field: "amount", header: "Amount", sort: true },
    { field: "currency", header: "Currency", sort: false },
    { field: "native_amount", header: "Native amount", sort: true },
    { field: "native_currency", header: "Native currency", sort: false },];
  wallets: ExchangeWallet[] = [];
  chartLabels: string[] = [];
  chartData: number[] = [];

  constructor(private coinbase: CoinbaseService) { }

  ngOnInit(): void {
    this.subscription = this.coinbase.getAccountDetails().subscribe((coinbaseWallets: ExchangeWallet[]) => {
      coinbaseWallets.forEach(wallet => {
        this.chartLabels.push(wallet.currency);
        this.chartData.push(wallet.native_amount);
      });
      this.wallets = coinbaseWallets;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createChartData(wallets): void {
    wallets.forEach(wallet => {
      this.chartLabels.push(wallet.currency);
      this.chartData.push(wallet.native_amount);
    })
  }
}
