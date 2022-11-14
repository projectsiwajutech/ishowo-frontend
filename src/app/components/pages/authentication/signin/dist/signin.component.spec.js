"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var signin_component_1 = require("./signin.component");
describe('SigninComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.waitForAsync(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [signin_component_1.SigninComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(signin_component_1.SigninComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
