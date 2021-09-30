import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExchangeAmountComponent } from './card-exchange-amount.component';

describe('CardExchangeAmountComponent', () => {
  let component: CardExchangeAmountComponent;
  let fixture: ComponentFixture<CardExchangeAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardExchangeAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardExchangeAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
