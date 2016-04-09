System.register(['angular2/core', '../ag-grid/ag-grid.component', '../detail-panel/detail-panel.component'], function(exports_1, context_1) {
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
    var core_1, ag_grid_component_1, detail_panel_component_1;
    var ContentWrapComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ag_grid_component_1_1) {
                ag_grid_component_1 = ag_grid_component_1_1;
            },
            function (detail_panel_component_1_1) {
                detail_panel_component_1 = detail_panel_component_1_1;
            }],
        execute: function() {
            ContentWrapComponent = (function () {
                function ContentWrapComponent() {
                    this._title = "Welcome";
                }
                ContentWrapComponent.prototype.test = function () {
                };
                ContentWrapComponent = __decorate([
                    core_1.Component({
                        selector: 'my-content-wrap',
                        templateUrl: '/app/content-wrap/content-wrap.component.html',
                        directives: [ag_grid_component_1.AgGridComponent, detail_panel_component_1.DetailPanelComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ContentWrapComponent);
                return ContentWrapComponent;
            }());
            exports_1("ContentWrapComponent", ContentWrapComponent);
        }
    }
});
//# sourceMappingURL=content-wrap.component.js.map