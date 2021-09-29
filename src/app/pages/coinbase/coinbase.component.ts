import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoinbaseService } from 'src/app/services/coinbase.service';

@Component({
  selector: 'app-coinbase',
  templateUrl: './coinbase.component.html',
  styleUrls: ['./coinbase.component.css']
})
export class CoinbaseComponent implements OnInit {

  subscription: Subscription;

  constructor(private coinbase: CoinbaseService) { }

  ngOnInit(): void {
    this.subscription = this.coinbase.getAccountDetails().subscribe(res => {
      console.log(res);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
