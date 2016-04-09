System.register(['angular2/core', 'angular2/platform/browser', './contact-detail'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, contact_detail_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (contact_detail_1_1) {
                contact_detail_1 = contact_detail_1_1;
            }],
        execute: function() {
            App = (function () {
                function App() {
                    this.ref = new Firebase('https://jrs-ngclassifieds.firebaseio.com');
                    this.classifieds = [];
                    var classifieds = this.classifieds;
                    this.ref.on('value', function (data) {
                        data.forEach(function (child) {
                            classifieds.push(child.val());
                        });
                    });
                }
                App = __decorate([
                    core_1.Component({
                        selector: 'app',
                        directives: [contact_detail_1.ContactDetail],
                        template: "\n        <div class=\"row\">\n            <div *ngFor=\"#classified of classifieds\" class=\"col-sm-4\">\n            \n            <div class=\"thumbnail\">\n                <img src=\"{{ classified.image }}\" />\n                <div class=\"caption\">\n                    <h2>{{ classified.title }}</h2>\n                    <h3>{{ classified.price | currency:'USD':true }}</h3>\n                    <p *ngIf=\"!classified.showContact\">{{ classified.description }}</p>\n                    <div *ngIf=\"classified.showContact\">\n                        <contact-detail [classified]=\"classified\">\n                        </contact-detail>\n                    </div>\n                    \n                    <button\n                        (click)=\"classified.showContact = true\"\n                        *ngIf=\"!classified.showContact\"\n                        class=\"btn btn-primary\">\n                        Contact\n                    </button>\n                    \n                    <button\n                        (click)=\"classified.showContact = false\"\n                        *ngIf=\"classified.showContact\"\n                        class=\"btn btn-primary\">\n                        Details\n                    </button>\n                    \n                </div>\n            </div>\n            \n            </div>\n        </div>\n    ",
                        styles: ["\n        .thumbnail { height: 650px; }\n    "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], App);
                return App;
            }());
            exports_1("App", App);
            browser_1.bootstrap(App);
        }
    }
});
