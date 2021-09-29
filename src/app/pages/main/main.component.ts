import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableHeader } from 'src/app/interfaces/table-header';


interface User {
  name;
  username;
  email;
  website;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  title: string;
  users: User[];
  tableHeaders: TableHeader[] = [
    { field: 'name', header: 'Name' },
    { field: 'username', header: 'Username' },
    { field: 'email', header: 'Email' },
    { field: 'website', header: 'Website' }];


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getUsers().then((users: User[]) => {
      this.users = users;
    });
  }

  getUsers(): Promise<User[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/users').toPromise().then((data: User[]) => { return data });
  }
}
