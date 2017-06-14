import { TargetHostConfig } from './kconfig';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import { routing } from './app.router';
import { AuthService } from './auth.service';
import { UsersComponent } from './users/users.component';
import { UserlistComponent } from './userlist/userlist.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { AutoComponent } from './auto/auto.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent, Home } from './app.component';
import { UsereditComponent } from './useredit/useredit.component';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { UserregisterComponent } from './userregister/userregister.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}
export function userFactory(http: AuthHttp) {
  return new UserService(http, 'http://localhost:5001', '5001');
}
export function targethostFactory(http: AuthHttp) {
  return new TargetHostConfig(http, 'http://localhost:5000', '5000');
}
@NgModule({
  declarations: [
    AppComponent, AutoComponent,
    LoginComponent, LogoutComponent,
    UserlistComponent, UsersComponent,
    Home, UsereditComponent, UserregisterComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule,
    routing,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, UserService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    {
      provide: UserService,
      useFactory: userFactory,
      deps: [AuthHttp]
    },
    {
      provide: TargetHostConfig,
      useFactory: targethostFactory,
      deps: [AuthHttp]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
