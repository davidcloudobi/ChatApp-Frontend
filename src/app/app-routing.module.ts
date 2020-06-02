import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { UiComponent } from './display/ui/ui.component';
import { AddtoroomComponent } from './chat/addtoroom/addtoroom.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'chat', component: UiComponent },
  { path: 'room', component: AddtoroomComponent },
  { path: 'msg', component: UiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
