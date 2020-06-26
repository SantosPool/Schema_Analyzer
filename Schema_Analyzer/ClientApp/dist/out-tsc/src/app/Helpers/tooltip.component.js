var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Directive, ElementRef, Inject, ViewChild } from '@angular/core';
var TooltipContainerDirective = /** @class */ (function () {
    function TooltipContainerDirective() {
    }
    TooltipContainerDirective = __decorate([
        Directive({
            selector: '.tooltip-container'
        })
    ], TooltipContainerDirective);
    return TooltipContainerDirective;
}());
export { TooltipContainerDirective };
var TooltipComponent = /** @class */ (function () {
    function TooltipComponent(config) {
        this.config = config;
    }
    TooltipComponent.prototype.ngOnInit = function () {
        var top = this.config.host.getBoundingClientRect().top;
        var height = this.tooltipContainer.nativeElement.getBoundingClientRect().height;
        this.top = top - height + "px";
    };
    __decorate([
        ViewChild(TooltipContainerDirective, { read: ElementRef }),
        __metadata("design:type", Object)
    ], TooltipComponent.prototype, "tooltipContainer", void 0);
    TooltipComponent = __decorate([
        Component({
            template: "\n    <div class=\"tooltip-container\" [ngStyle]=\"{top: top}\">\n      <ng-content></ng-content>\n    </div>\n  ",
            styles: [
                "\n      .tooltip-container {\n        background-color: black;\n        color: #fff;\n        display: inline-block;\n        padding: 0.5em;\n        position: absolute;\n      }\n    "
            ]
        }),
        __param(0, Inject('tooltipConfig')),
        __metadata("design:paramtypes", [Object])
    ], TooltipComponent);
    return TooltipComponent;
}());
export { TooltipComponent };
//# sourceMappingURL=tooltip.component.js.map