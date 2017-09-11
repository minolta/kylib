import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

export interface HostInterface {
    getHost(): string;
    getPort(): string;
    getHttp(): AuthHttp;
}
@Injectable()
export class TargetHostConfig implements HostInterface {

    constructor(public http: AuthHttp, private host: string, private port: string) {
        console.log('Config host to ' + host + ' port:' + port);
    }
    public getHost(): string {
        return this.host;
    }
    public getPort(): string {
        return this.port;
    }
    public getHttp() {
        return this.http;
    }
    public getTarget()
    {
        return this.host+":"+this.port
    }
}