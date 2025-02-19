var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_auth, notifier, _router) {
        this._auth = _auth;
        this._router = _router;
        this.userData = {};
        this.notifier = notifier;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this._auth.login(this.userData)
            .subscribe(function (token) { _this.getToken(token); }, function (error) {
            _this.errorManager(error);
        });
    };
    LoginComponent.prototype.getToken = function (token) {
        console.log(JSON.stringify(token));
        localStorage.setItem('token', token.token);
        localStorage.setItem('tokenExpiration', token.expiration);
        this._router.navigate([""]);
    };
    LoginComponent.prototype.errorManager = function (error) {
        if (error && error.error) {
            this.notifier.notify('warning', 'User Or Password Incorrect!!!');
        }
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [AuthenticationService, NotifierService,
            Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map