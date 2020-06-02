import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignalRService } from './services/signal-r.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { UiComponent } from './display/ui/ui.component';
import { AddtoroomComponent } from './chat/addtoroom/addtoroom.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, UiComponent, AddtoroomComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [SignalRService],
  bootstrap: [AppComponent],
})
export class AppModule {}
