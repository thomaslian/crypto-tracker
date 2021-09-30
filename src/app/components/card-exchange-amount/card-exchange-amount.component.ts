import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-exchange-amount',
  templateUrl: './card-exchange-amount.component.html',
  styleUrls: ['./card-exchange-amount.component.css']
})
export class CardExchangeAmountComponent implements OnInit {

  @Input() currency: string;
  @Input() balance: number = 0.00;

  constructor() { }

  ngOnInit(): void {
  }

}
