import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoinbaseService } from 'src/app/services/coinbase.service';


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
  

  constructor(
    private http: HttpClient,
    private coinbase: CoinbaseService 
    ) { }

  ngOnInit(): void {
    this.getUsers().then((users: User[]) => {
      this.users = users;
    });
    /*
    this.coinbase.getAccountDetails().subscribe(res => {
      console.log(res);
    });*/
  }

  getUsers(): Promise<User[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/users').toPromise().then((data: User[]) => { return data });
  }
}
