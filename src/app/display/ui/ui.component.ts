// ######################################################################################

import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
// import {
//   DialogComponent,
//   AnimationSettingsModel,
// } from '@syncfusion/ej2-angular-popups';
// import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
// import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
// import { SignalRService } from 'src/services/services/signal-r.service';
// import { Message } from 'src/models/message';
// import { AuthServices } from 'src/services/authservices';
import { Message } from '../../Model/Message';
import { SignalRService } from '../../services/signal-r.service';
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   // encapsulation: ViewEncapsulation.None,
// })
@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
})
export class UiComponent implements OnInit {
  title = 'ClientApp';
  txtMessage: string = '';
  //txt = '';
  uniqueID: string = new Date().getTime().toString();
  messages = new Array<Message>();
  message = new Message();
  constructor(
    private chatService: SignalRService,
    private _ngZone: NgZone // private authService: AuthServices
  ) {
    this.subscribeToEvents();
  }
  ngOnInit(): void {
    // this.chatService.messageReceived.subscribe((msg: any) => {
    //   this.message = msg;
    /// });
  }
  // sendMessage(): void {
  //   if (this.txtMessage) {
  //     this.message = new Message();
  //     // if (!this.authService.isUserLoggedIn()) {
  //     //   this.message.clientuniqueid = 'admin@support';
  //     //   this.message.FromUserName = 'support';
  //     // } else {
  //     this.message.clientuniqueid = this.uniqueID;
  //     this.message.FromUserName = 'customer';
  //     // }
  //     this.message.type = 'sent';
  //     this.message.message = this.txtMessage;
  //     this.message.date = new Date();
  //     this.messages.push(this.message);
  //     this.chatService.sendMessage(this.message);
  //     this.txtMessage = '';
  //   }
  // }
  private subscribeToEvents(): void {
    this.chatService.messageReceived.subscribe((message: any) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          message.type = 'received';
          // this.messages.push(message);
          this.messages = message;
        }
      });
    });
  }

  submit(data: HTMLInputElement, user: HTMLInputElement) {
    console.log(data.value);
    this.txtMessage = data.value;
    if (this.txtMessage) {
      this.message = new Message();
      // if (!this.authService.isUserLoggedIn()) {
      //   this.message.clientuniqueid = 'admin@support';
      //   this.message.FromUserName = 'support';
      // } else {
      this.message.clientuniqueid = this.uniqueID;
      this.message.FromUserName = user.value;
      // }
      this.message.type = 'sent';
      this.message.ToUserName = 'user';
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      // this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }
}
