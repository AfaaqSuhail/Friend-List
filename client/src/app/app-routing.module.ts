import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './common/services/auth-guard.service'
import { UserResolver } from './common/resolves/user.resolve';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      user: UserResolver
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: {
      user: UserResolver
    },
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    resolve: {
      user: UserResolver
    },
  },
  {
    path: 'friends',
    canActivate: [AuthGuard],
    component: FriendsComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: '**', 
    redirectTo: '404'
  },
  {
    path: '404',
    component: NotFoundComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
