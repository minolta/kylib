import { FormControl } from '@angular/forms';
import { OnInit, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
/**
 * สำหรับทำ Autocomplete ใช้ method
 * s()
 * sn()
 * p  สำหรับใส่ Placeholrder
 * bag ใช้สำหรับ ส่งค่าออกมา
 * service ใช้สำหรับ list และค้นหา ที่เราจะทำ auto
 * select สำหรับเมื่อมีการเลือกจะส่งที่เลือกออกไป
 */
export declare class AutoComponent implements OnInit, OnChanges {
    constructor();
    bag: {
        obj: {
            name: string;
            id: number;
        };
    };
    placeholder: string;
    p: string;
    service: any;
    c: FormControl;
    datas: Observable<any>;
    select: EventEmitter<{}>;
    trytosearch: boolean;
    ngOnInit(): void;
    /**
     * เมื่อกดเลือกแล้ว ก็ไม่ต้องค้นหาอะไรอีก
     * findobj ก็จะไม่ทำงาน
     */
    selectvalue(e: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    notfound(object: any): Observable<any[]>;
    /**
     * ใช้ค้นหาว่า คำที่ให้ค้นมีอะไรบ้าง
     */
    find(term: string, service: any, target: any): Observable<any>;
    /**
     * ใช้สำหรับค้นหาว่าที่ผิดไว้แต่ไม่เลือก ให้ระบบค้นหาให้เจอถ้าเจอแล้วก็เลือกมาใส่เอง
     * โดยไม่ต้องกดเลือก
     */
    findobj(service: any, term: any, target: any): void;
    objnotfound(target: any, term: any): void;
}
