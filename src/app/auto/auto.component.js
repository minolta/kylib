"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
const core_1 = require("@angular/core");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/switchMap");
const Observable_1 = require("rxjs/Observable");
/**
 * สำหรับทำ Autocomplete ใช้ method
 * s()
 * sn()
 * p  สำหรับใส่ Placeholrder
 * bag ใช้สำหรับ ส่งค่าออกมา
 * service ใช้สำหรับ list และค้นหา ที่เราจะทำ auto
 * select สำหรับเมื่อมีการเลือกจะส่งที่เลือกออกไป
 */
let AutoComponent = class AutoComponent {
    constructor() {
        this.bag = { obj: { name: '', id: 0 } };
        this.p = 'autocomplete';
        this.c = new forms_1.FormControl();
        this.select = new core_1.EventEmitter();
        this.trytosearch = true; //ใช้สำหรับบอกว่าถ้า เลือกจาก list แล้วไม่ต้อง search อีกรอบ
    }
    ngOnInit() {
        this.datas = this.c.valueChanges.debounceTime(300).distinctUntilChanged().switchMap(term => term // switch to new observable each time
            ? this.find(term, this.service, this.bag) : this.notfound(this.bag))
            .catch(error => {
            console.log(`Error in component ... ${error}`);
            return Observable_1.Observable.of([]);
        });
    }
    /**
     * เมื่อกดเลือกแล้ว ก็ไม่ต้องค้นหาอะไรอีก
     * findobj ก็จะไม่ทำงาน
     */
    selectvalue(e) {
        console.log('select value ' + JSON.stringify(e));
        this.select.emit(e);
        this.bag.obj = e;
        this.trytosearch = false;
    }
    ngOnChanges(changes) {
    }
    notfound(object) {
        console.log('Not found ');
        // object.obj.name = '';
        return Observable_1.Observable.of([]);
    }
    /**
     * ใช้ค้นหาว่า คำที่ให้ค้นมีอะไรบ้าง
     */
    find(term, service, target) {
        console.log('find ' + JSON.stringify(term) + ' ' + this.trytosearch);
        let o = service.sn(term);
        console.log(o);
        this.findobj(service, term, target);
        return o;
    }
    /**
     * ใช้สำหรับค้นหาว่าที่ผิดไว้แต่ไม่เลือก ให้ระบบค้นหาให้เจอถ้าเจอแล้วก็เลือกมาใส่เอง
     * โดยไม่ต้องกดเลือก
     */
    findobj(service, term, target) {
        console.log('find one  ' + term);
        let one = service.sm(term);
        one.subscribe(data => {
            console.log('Found object :' + JSON.stringify(data));
            if (data instanceof Array) {
                console.log('IS Array');
                if (data.length === 1) {
                    target.obj = data[0];
                }
                else {
                    console.log('Object not found ' + term);
                    this.objnotfound(target, term);
                }
            }
            else {
                console.log('Fond obj ' + JSON.stringify(data));
                target.obj = data;
                this.select.emit(data);
            }
        }, error => {
            console.log('ERROR : Object not found ' + term);
            this.objnotfound(target, term);
        });
    }
    objnotfound(target, term) {
        target.obj = { name: term, id: 0 };
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AutoComponent.prototype, "bag", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AutoComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AutoComponent.prototype, "p", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AutoComponent.prototype, "service", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AutoComponent.prototype, "select", void 0);
AutoComponent = __decorate([
    core_1.Component({
        selector: 'app-auto',
        templateUrl: './auto.component.html',
        styleUrls: ['./auto.component.css']
    }),
    __metadata("design:paramtypes", [])
], AutoComponent);
exports.AutoComponent = AutoComponent;
//# sourceMappingURL=auto.component.js.map