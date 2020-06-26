var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Injector, Input, ReflectiveInjector, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(element, renderer, injector, resolver, vcr) {
        this.element = element;
        this.renderer = renderer;
        this.injector = injector;
        this.resolver = resolver;
        this.vcr = vcr;
    }
    TooltipDirective.prototype.mouseenter = function () {
        if (this.componentRef)
            return;
        var factory = this.resolver.resolveComponentFactory(TooltipComponent);
        var injector = ReflectiveInjector.resolveAndCreate([
            {
                provide: 'tooltipConfig',
                useValue: {
                    host: this.element.nativeElement
                }
            }
        ]);
        this.componentRef = this.vcr.createComponent(factory, 0, injector, this.generateNgContent());
    };
    TooltipDirective.prototype.generateNgContent = function () {
        if (typeof this.content === 'string') {
            var element = this.renderer.createText(this.content);
            return [[element]];
        }
        if (this.content instanceof TemplateRef) {
            var viewRef_1 = this.content.createEmbeddedView({});
            return [viewRef_1.rootNodes];
        }
        // Else it's a component
        var factory = this.resolver.resolveComponentFactory(this.content);
        var viewRef = factory.create(this.injector);
        return [[viewRef.location.nativeElement]];
    };
    TooltipDirective.prototype.mouseout = function () {
        this.destroy();
    };
    TooltipDirective.prototype.destroy = function () {
        this.componentRef && this.componentRef.destroy();
        this.componentRef = null;
    };
    TooltipDirective.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    __decorate([
        Input('tooltip'),
        __metadata("design:type", Object)
    ], TooltipDirective.prototype, "content", void 0);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "mouseenter", null);
    __decorate([
        HostListener('mouseout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "mouseout", null);
    TooltipDirective = __decorate([
        Directive({
            selector: '[tooltip]'
        }),
        __metadata("design:paramtypes", [ElementRef,
            Renderer2,
            Injector,
            ComponentFactoryResolver,
            ViewContainerRef])
    ], TooltipDirective);
    return TooltipDirective;
}());
export { TooltipDirective };
//# sourceMappingURL=tooltip.directive.js.map