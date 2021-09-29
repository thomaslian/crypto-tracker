import { Component, Input, OnInit } from '@angular/core';
import { TableHeader } from 'src/app/interfaces/table-header';

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
  }

}
