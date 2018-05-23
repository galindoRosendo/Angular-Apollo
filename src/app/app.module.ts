import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ElModule } from 'element-angular'
import { DatePipe } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';


import 'element-angular/theme/index.css';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component'
import { SignInComponent } from './user/sign-in/sign-in.component'

import { CookieService } from 'ngx-cookie-service';
import { setContext } from 'apollo-link-context';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    ElModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfTMKevpVej9_E2hYdF9PQ4LDEVL7w3DM'
    }),
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private cookieService: CookieService 
  ) {

    const http = httpLink.create({uri: 'http://localhost:8000/graphql'});

    const auth = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      //const token = localStorage.getItem('token');

      const token = cookieService.get('token');

      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
      if (!token) {
        return {};
      } else {
        return {
          headers: {
            'Authorization': `JWT ${token}`
          }
        };
      }
    });
    apollo.create({
      // By default, this client will send queries to the
      // `/graphql` endpoint on the same host
      link: auth.concat(http),
      cache: new InMemoryCache()
    });
  }
}
