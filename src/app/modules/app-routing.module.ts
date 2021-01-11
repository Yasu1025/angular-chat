import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from '../components/chat/chat.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LoginComponent } from '../components/login/login.component';

const routes: Routes = [
  { path: '', component: ChatComponent},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }