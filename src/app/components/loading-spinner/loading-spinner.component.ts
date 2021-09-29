import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  @Input() data: boolean;
  @Input() loadingString?: string = "Getting information"; 

  constructor() { }

  ngOnInit(): void {
  }

}
