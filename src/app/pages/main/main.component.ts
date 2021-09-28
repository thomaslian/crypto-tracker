import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sha256 } from 'js-sha256';
import { environment } from '../../../environments/environment';


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
  coinbaseApiUrl: string = 'https://api.coinbase.com/';
  apiKey: string = environment.coinbase.apiKey;
  apiSecret: string = environment.coinbase.apiSecret;
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers().then((users: User[]) => {
      this.users = users;
    });

    this.getCoinbaseAccounts().then(res => {
      console.log(res);
    });
  }

  getUsers(): Promise<User[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/users').toPromise().then((data: User[]) => { return data });
  }

  async getCoinbaseAccounts() {
    const timeStamp: string = await this.http.get("https://api.coinbase.com/v2/time").toPromise().then((data: any) => {return data.data.epoch.toString()});
    const method: string = "GET";
    const requestPath: string = `/v2/accounts`;
    const cbAccessString: string = sha256.hmac(this.apiSecret, timeStamp + method + requestPath);
    return this.http.get(this.coinbaseApiUrl + requestPath, {headers: {"CB-ACCESS-KEY": this.apiKey, "CB-ACCESS-SIGN": cbAccessString, "CB-ACCESS-TIMESTAMP": timeStamp}}).toPromise().then((data: User[]) => { return data });
  }
}
