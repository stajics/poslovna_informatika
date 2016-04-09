System.register(['angular2/core', 'ng2-bs3-modal/ng2-bs3-modal', '../ag-grid/ag-grid.component', '../detail-panel/detail-panel.component', '@ngrx/store'], function(exports_1, context_1) {
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
    var core_1, ng2_bs3_modal_1, ag_grid_component_1, detail_panel_component_1, store_1;
    var MyNextComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (ag_grid_component_1_1) {
                ag_grid_component_1 = ag_grid_component_1_1;
            },
            function (detail_panel_component_1_1) {
                detail_panel_component_1 = detail_panel_component_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            MyNextComponent = (function () {
                function MyNextComponent(_store) {
                    this._store = _store;
                }
                //modalOwner - modal owner, nextForeignKey - modal owner foreign key (caller: mesto -> nextForeignKey: drzva)
                MyNextComponent.prototype.showNext = function (modalOwner, nextForeignKey, idValue) {
                    if (modalOwner === 'osnovna_valuta') {
                        modalOwner = 'kurs_u_valuti';
                        nextForeignKey = 'osnovna_valuta';
                    }
                    if (modalOwner === 'prema_valuti') {
                        modalOwner = 'kurs_u_valuti';
                        nextForeignKey = 'prema_valuti';
                    }
                    this._modalOwner = modalOwner;
                    this._nextForeignKey = nextForeignKey;
                    this.grid.initNextGrid(modalOwner, nextForeignKey, idValue);
                    this.panel.initNextPanel(modalOwner);
                    this.modal.open();
                };
                MyNextComponent.prototype.closeModal = function () {
                    this.myDispose();
                };
                __decorate([
                    core_1.ViewChild('modal'), 
                    __metadata('design:type', Object)
                ], MyNextComponent.prototype, "modal", void 0);
                __decorate([
                    core_1.ViewChild('grid'), 
                    __metadata('design:type', Object)
                ], MyNextComponent.prototype, "grid", void 0);
                __decorate([
                    core_1.ViewChild('panel'), 
                    __metadata('design:type', Object)
                ], MyNextComponent.prototype, "panel", void 0);
                MyNextComponent = __decorate([
                    core_1.Component({
                        selector: 'my-next',
                        templateUrl: 'app/next/next.component.html',
                        directives: [core_1.forwardRef(function () { return ag_grid_component_1.AgGridComponent; }), core_1.forwardRef(function () { return detail_panel_component_1.DetailPanelComponent; }), ng2_bs3_modal_1.MODAL_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [store_1.Store])
                ], MyNextComponent);
                return MyNextComponent;
            }());
            exports_1("MyNextComponent", MyNextComponent);
        }
    }
});
//# sourceMappingURL=next.component.js.map