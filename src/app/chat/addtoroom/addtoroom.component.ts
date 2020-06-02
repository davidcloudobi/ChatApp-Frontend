import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-addtoroom',
  templateUrl: './addtoroom.component.html',
  styleUrls: ['./addtoroom.component.css'],
})
export class AddtoroomComponent implements OnInit {
  constructor(private signalR: SignalRService) {}

  ngOnInit(): void {}
  addtoroom(name: HTMLInputElement) {
   // this.signalR.onReg(name.value);
  }
 
}
