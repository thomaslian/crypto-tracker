import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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

  title: String;
  users: User[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers().then((users: User[]) => {
      this.users = users;
    });
  }

  getUsers(): Promise<User[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/users').toPromise().then((data: User[]) => { return data });
  }
}
