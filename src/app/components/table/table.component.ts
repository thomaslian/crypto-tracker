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

  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
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
