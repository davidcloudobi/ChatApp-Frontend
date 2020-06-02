// ###########################################3

import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Message } from '../../app/Model/Message';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();
  resData;
  newUser = true;
  private connectionIsEstablished = false;
  private _hubConnection: signalR.HubConnection;

  // username: string;
  // password: string;

  constructor(private http: HttpClient) {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  private storeToLocalStorage(data: any) {
    localStorage.setItem('Auth_token', JSON.stringify(data));
  }

  getFromLocalSorage() {
    if (
      localStorage.getItem('Auth_token') !== null ||
      localStorage.getItem('Auth_token') !== undefined
    )
      return JSON.parse(localStorage.getItem('Auth_token'));

    return null;
  }
  //#################################################################

  postData: { userName: string; password: string } = {
    userName: '',
    password: '',
  };

  onLogin(name, psw) {
    this.postData.userName = name;
    this.postData.password = psw;
    console.log(this.postData);

    var token = this.getFromLocalSorage();
    console.log(token);
    let headers = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    //var authToken = this.authService.getFromLocalSorage() != null?this.authService.getFromLocalSorage().token:null;
    // Send Http request
    this.http
      .post('https://localhost:44328/auth/login', this.postData, headers)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onReg(username, password) {
    this.postData.userName = username;
    this.postData.password = password;
    console.log(this.postData);
    // Send Http request
    this.http
      .post('https://localhost:44328/auth/reg', this.postData, {
        responseType: 'text',
      })
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.storeToLocalStorage(responseData);
        },
        (response) => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        }
      );

    // this.http.post('https://localhost:44344/auth/reg', this.postData).pipe(
    //   tap((data) => {
    //     this.resData = data;
    //     console.log(this.resData);
    //   }),
    //   catchError(this.handleError)
    // );

    // this.http.post('http://localhost:55698/auth/reg', this.postData).subscribe(
    //   (val) => {
    //     console.log('POST call successful value returned in body', val);
    //   },
    //   (response) => {
    //     console.log('POST call in error', response);
    //   },
    //   () => {
    //     console.log('The POST observable is now completed.');
    //   }
    // );
  }

  addtoroom(roomName) {
    // this.postData.userName = username;
    // this.postData.password = password;
    // console.log(this.postData);
    // Send Http request
    // this.http
    //   .post('https://localhost:44344/auth/reg', username, {
    //     responseType: 'text',
    //   })
    //   .subscribe(
    //     (responseData) => {
    //       console.log(responseData);
    //       //this.storeToLocalStorage(responseData);
    //     },
    //     (response) => {
    //       console.log('POST call in error', response);
    //     },
    //     () => {
    //       console.log('The POST observable is now completed.');
    //     }
    //   );

    this._hubConnection.invoke('AddToRoom', roomName);
  }
  //#################################################################
  sendMessage(message: Message) {
    if (this.newUser) {
      this._hubConnection.invoke('JoinRoom', message.ToUserName);

      this.newUser = false;
    }
    this._hubConnection.invoke('OnConnected');
    this._hubConnection.invoke('sendMessage', message);
  }

  private createConnection() {
    var token = this.getFromLocalSorage();
    console.log(token);
    let headers = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

    // const options: signalR.IHttpConnectionOptions = {
    //   accessTokenFactory: () => {
    //     return token;
    //   },
    // };

    // this._hubConnection = new signalR.HubConnectionBuilder()
    //   .configureLogging(signalR.LogLevel.Information)
    //   .withUrl('http://localhost:55698/chathub', options)
    //   .build();

    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44328/chatHub', {
        accessTokenFactory: () => {
          return this.getFromLocalSorage();
        },
      })
      .build();

    // this._hubConnection = new signalR.HubConnectionBuilder()
    //   .withUrl('https://localhost:44328/chatHub')
    //   .build();

    // this._hubConnection = new signalR.HubConnectionBuilder()
    //   .withUrl('https://localhost:44344/chathub', {
    //     accessTokenFactory: () => token,
    //   })
    //   .build();
  }

  // private connectionId;
  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch((err) => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () {
          this.startConnection();
        }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('ReceiveMessage', (data: any) => {
      console.log(data);
      this.messageReceived.emit(data);
    });
  }
}
