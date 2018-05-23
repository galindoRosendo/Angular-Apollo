import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {GC_AUTH_TOKEN, GC_USER_ID} from '../constans';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginService {

  private userId: string = null;
  private _isAuthenticated = new BehaviorSubject(false);

  get isAuthenticated(): Observable<any> {
    return this._isAuthenticated.asObservable();
  }

  saveUserData(id: string, token: string) {

    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.setUserId(id);
  }

  setUserId(id: string) {
    this.userId = id;

    this._isAuthenticated.next(true);
  }

  userAuth = gql`mutation($user:String!,$pass:String!){
    tokenAuth(username:$user,password:$pass){
      token
    }
  }`;

  tokenVerify = gql`mutation($token:String!) {
    verifyToken(token:$token){
      payload
    }
  }`;

  constructor(
    private apollo: Apollo, 
    private cookieService: CookieService
  ){

  }

  verifyUser(token){
    //var result: Boolean = false;
    return this.apollo.mutate({
      mutation: this.tokenVerify,
      variables:{
        token: token,
      }
    })
  }

  userAuthentication(user,pass) {
    return this.apollo.mutate({
      mutation: this.userAuth,
      variables: {
        user: user,
        pass: pass
        //user: "raul",
        //pass: "Redpanda10"
      }
    });
  }

  getToken(){
    return localStorage.getItem(GC_AUTH_TOKEN);
  }
  
  logout() {
    this.apollo.getClient().resetStore();
    localStorage.removeItem(GC_USER_ID);
    localStorage.removeItem(GC_AUTH_TOKEN);
  }

}