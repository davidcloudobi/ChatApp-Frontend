import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private signalR: SignalRService) {}




  
  ngOnInit(): void {}
  reg(name: HTMLInputElement, psw: HTMLInputElement) {
    this.signalR.onReg(name.value, psw.value);
  }
  login(name: HTMLInputElement, psw: HTMLInputElement) {
    //console.log(name.value, psw.value);
    this.signalR.onLogin(name.value, psw.value);
  }
}
