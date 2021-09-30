import { Component, Input, OnInit } from '@angular/core';
import { TableHeader } from 'src/app/interfaces/table-header';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() cols: TableHeader[];
  @Input() data: any[];
  @Input() chartLabels?: string[];
  @Input() chartData?: number[];

  chart: any;

  constructor() { }

  ngOnInit(): void {
    /*
    console.log(this.chartLabels)
    console.log(this.chartData)
    this.chart = {
      labels: this.chartLabels,
      datasets: [
        {
          data: this.chartData,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }
      ]
    };

    
    this.chart = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };*/
  }



  customSort(event: SortEvent) {
    event.data.sort((a, b) => {
      let value1 = a[event.field];
      let value2 = b[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }

}
