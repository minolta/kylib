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


        let t = localStorage.getItem('token')
        if (t == null)
            return null
        return this.jwtHelper.decodeToken(t);
    }
    logout() {
        localStorage.removeItem('token');
    }
    admin() {
        let o = this.info();
        if(o==null)
          return null
        return o.admin;
    }
}