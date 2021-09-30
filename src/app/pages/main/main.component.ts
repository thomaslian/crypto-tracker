import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableHeader } from 'src/app/interfaces/table-header';
import { Observable, Subscription } from 'rxjs';


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

  subscription: Subscription;
  title: string;
  users: User[];
  tableHeaders: TableHeader[] = [
    { field: 'name', header: 'Name', sort: true },
    { field: 'username', header: 'Username', sort: false },
    { field: 'email', header: 'Email', sort: false },
    { field: 'website', header: 'Website', sort: false }];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.subscription = this.getUsers().subscribe((users: User[]) => { this.users = users });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getUsers(): Observable<User[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/users') as Observable<User[]>;
  }
}
