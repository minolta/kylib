import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
   public jwtHelper: JwtHelper = new JwtHelper();
    constructor() { }
    loggedIn() {
        return tokenNotExpired();
    }
    info() {
        return this.jwtHelper.decodeToken(localStorage.getItem('token'));
    }
    logout() {
        localStorage.removeItem('token');
    }
    admin() {
        let o = this.info();

        return o.admin;
    }
}