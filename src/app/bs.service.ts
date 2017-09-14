import { Serviceinterface } from './serviceinterface';
import { Searchobj } from './searchobj';
import { TargetHostConfig } from './kconfig';
import { AuthHttp } from 'angular2-jwt';
import { UserService } from './user.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import { Bsi } from './bs.interface';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';


@Injectable()
export class BS implements Serviceinterface {
    host = 'localhost';
    port: string;
    urllist = null;
    urladd = null;
    urlsearch = null;
    urlget = null;
    urldelete = null;
    urls = null;
    urllistdatas = null;
    urlsearchpages = null;
    urlcount = null;
    urledit = null;
    urlsn = null;
    urlsearchbypost = null;
    urlsm = null;
    //constructor(){};
    ht: AuthHttp;
    constructor(private htg: TargetHostConfig) {
        this.ht = htg.getHttp();
        this.host = htg.getHost();
        this.port = htg.getPort();

        //this.host = hostconfig.host;
        //  this.us.setHost(this.host);
    }
    setHost(nh: string) {
        this.host = nh;
    }
    gets() {
        return this.ht.get(this.urllist, ).map((res: Response) => res.json()).catch(this.handleError);
    }

    add(value: any) {
        console.log("add value" + value);
        console.log('ADD URL:' + this.urladd);
        return this.ht.post(this.urladd, value).map((res: Response) => res.json()).catch(this.handleError);
    }
    get(id: number): any {
        console.log('GET URL:' + this.urlget + '/' + id);
        return this.ht.get(this.urlget + '/' + id).map((res: Response) => res.json()).catch(this.handleError);
    }
    search(search: string) {
        let s:Searchobj = {
            search: search,
            page: 0,
            limit: 100
        };
        return this.ht.post(this.urlsearch, s).map(res => res.json());
    }
    searchpages(so: Searchobj) {
        return this.post(so, this.urlsearchpages);
    }
    addbyurl(value: any, url: string) {
        console.log("add value" + value);
        console.log('ADD URL:' + url);
        return this.ht.post(url, value).map((res: Response) => res.json());
    }
    post(value: any, url: string) {
        console.log('call post');
        return this.ht.post(url, value).map((res: Response) => res.json());
    }
    delete(id: number) {
        let du = this.urldelete + "/" + id;
        return this.ht.get(du).map((res: Response) => res.json()).catch(this.handleError);
        //     return this.ht.post(du, { headers: h }).map((res: Response) => res.json());
    }
    g(url: string) {
        return this.ht.get(url).map((res: Response) => res.json()).catch(this.handleError);
    }
    s(v: String): any {
        return this.ht.get(this.urls + '/' + v).map((res: Response) => res.json()).catch(this.handleError);
    }
    ss(v: String): any {
        let u = this.urls + '/' + v;
        return this.g(u);
    }
    listdatas(page: number, limit: number) {
        let listurls = this.urllistdatas + '/' + page + '/' + limit;
        return this.g(listurls);
    }

    /**
     * ใช้สำหรับ หาว่ามีจำนวนกี่หน้า
     * @param s 
     * @param pp 
     */
    count(s: string, pp: number) {
        let counturl = this.urlcount + '/' + pp;
        return this.g(counturl);
    }

    handleError(error: Response | any): Observable<any> {
        console.log(error);
        return Observable.throw(error.json());
    }

    edit(value: any) {
        return this.addbyurl(value, this.urledit);
    }
    /**
     * SN จะส่งข้อมูลการค้นหาไปยัง Server ตามที่ this.urlsn กำหนด
     * แต่จะไม่สามารถ เปลียน page และ limit ได้
     */
    sn(obj) {
        console.log('call:' + this.urlsn);
        if(obj.hasOwnProperty("search"))
        return this.addbyurl(obj,this.urlsn)
        let tos = { search: obj, page: 0, limit: 50 };
        return this.addbyurl(tos, this.urlsn);
    }

    /**
     * ใช้สำหรับค้นหาให้ตรงเท่านั้นไม่ใช้ like 
     */
    sm(obj) {
        console.log('call:' + this.urlsn);
        let tos = { search: obj, page: 0, limit: 50 };
        return this.addbyurl(tos, this.urlsm);
    }
    searchbypost(obj) {
        return this.addbyurl(obj, this.urlsearchbypost);
    }
}