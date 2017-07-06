import { Logininfo } from './logininfo';
import { User } from './user';
import { Serviceinterface } from './serviceinterface';
import { Http, Headers, Response } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
@Injectable()
export class UserService implements Serviceinterface {

    headers = new Headers({ 'Content-Type': 'application/json' });
    //host: string = "http://pixka.me:3333";
    registerurl = '/rest/register';  // URL to web api
    loginurl = '/user/login';  // URL to web api
    infourl = '/rest/info';  // URL to web api


    constructor(@Inject(AuthHttp) private http: AuthHttp, public host: string, public port: string) {

    }

    setHost(nhost: string) {
        this.host = nhost;
    }

    register(user: User) {
        return this.http.post(this.host + this.registerurl, user).map((res: Response) => res.json()).catch(this.handleError);
    }

    login(user: User) {
        let lo: Logininfo = { user: user };
        return this.http.post(this.host + this.loginurl, lo).map((res: Response) => res.json()).catch(this.handleError);

    }

    lists() {
        let url = this.host + '/rest/lists';
        return this.http.get(url).map((res: Response) => res.json()).catch(this.handleError);
    }

    isLogin() {

        let cc: string = localStorage.getItem("currentUser");
        if (cc != '')
            return true;

        return false;
    }

    info(token: string) {

        let header1 = this.getTokenheader();
        return this.http.get(this.host + this.infourl, { headers: header1 });

    }

    loginname() {
        return localStorage.getItem("currentUser");
    }

    getTokenheader() {
        let token = localStorage.getItem("token");
        let header1 = new Headers({ 'Content-Type': 'application/json' });
        header1.append('Authorization', 'Bearer ' + token);

        return header1;
    }


    logout() {
        localStorage.setItem("token", '');
        localStorage.setItem("currentUser0", '');
    }

    get(id: number): any { }
    gets() { }
    add(obj: any) { }
    delete(id: number) { }
    search(value: string) { }
    handleError(error: Response | any): Observable<any> {
        console.log(error);
        return Observable.throw(error.json());
    }
}