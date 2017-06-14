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
const user_service_1 = require("./../user.service");
const kconfig_1 = require("./../../kconfig");
const router_1 = require("@angular/router");
const http_1 = require("@angular/http");
const core_1 = require("@angular/core");
let LoginComponent = class LoginComponent {
    constructor(us, http, tgh, router) {
        this.us = us;
        this.http = http;
        this.tgh = tgh;
        this.router = router;
    }
    ngOnInit() {
    }
    login() {
        localStorage.removeItem('token');
        let u = { login: this.user, password: this.password };
        let url = this.us.host + '/login';
        console.log('URL:' + url);
        let lo = { user: u };
        this.http.post(url, lo).subscribe(d => {
            console.log('D:' + JSON.stringify(d));
            let re = d.json();
            localStorage.setItem('token', re.token);
            this.router.navigate(['/home']);
        }, e => console.log(e));
    }
};
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, http_1.Http, kconfig_1.TargetHostConfig, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map