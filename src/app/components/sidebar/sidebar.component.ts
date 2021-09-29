import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  displaySidebar: boolean = true;
  navigation: MenuItem[] = [{
    label: 'Navigate',
    items: [{
      label: 'Overview',
      routerLink: [''],
      routerLinkActiveOptions: { exact: true }
    },{
      label: 'Coinbase',
      routerLink: ['/coinbase'],
      routerLinkActiveOptions: { exact: true }
    }]
  }];

  constructor() { }

  ngOnInit(): void {

  }
}
