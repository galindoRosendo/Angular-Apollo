import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent , data: { state: 'home' } },
  { path: 'sign-up', component: SignUpComponent ,
    
  },
  { 
    path: 'login', 
    component: SignInComponent ,
    data: { state: 'login' } 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
