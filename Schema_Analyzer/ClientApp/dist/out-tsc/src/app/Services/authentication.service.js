var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this._url = "/api/Authenticate";
    }
    AuthenticationService.prototype.login = function (userInfo) {
        return this.http.post(this._url + '/authenticate', userInfo);
    };
    AuthenticationService.prototype.getToken = function () {
        return localStorage.getItem("token");
    };
    AuthenticationService.prototype.getExpirationToken = function () {
        return localStorage.getItem("tokenExpiration");
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
    };
    AuthenticationService.prototype.isLogged = function () {
        var exp = this.getExpirationToken();
        if (!exp) {
            // el token no existe
            return false;
        }
        var now = new Date().getTime();
        var dateExp = new Date(exp);
        if (now >= dateExp.getTime()) {
            // ya expiró el token
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            return false;
        }
        else {
            return true;
        }
    };
    AuthenticationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map