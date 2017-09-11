import { Searchobj } from './../searchobj';
import { TargetHostConfig } from './../kconfig';
import { BS } from './../bs.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DbconfigService extends BS {
    constructor(private tgh: TargetHostConfig) {
        super(tgh)
        this.urlsn = tgh.getTarget()+"/rest/dbconfig/sn"
        this.urlsm = tgh.getTarget()+"/rest/dbconfig/sm"
        this.urladd = tgh.getTarget()+"/rest/dbconfig/add"
        this.urledit = tgh.getTarget()+"/rest/dbconfig/edit"
    }

   
}