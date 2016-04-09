System.register(['angular2/platform/browser', './app.component', 'rxjs/Rx', '@ngrx/store', './common/redux/reducers/selectedElements.reducer', './common/redux/reducers/rowData.reducer'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, app_component_1, store_1, selectedElements_reducer_1, rowData_reducer_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (_1) {},
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (selectedElements_reducer_1_1) {
                selectedElements_reducer_1 = selectedElements_reducer_1_1;
            },
            function (rowData_reducer_1_1) {
                rowData_reducer_1 = rowData_reducer_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [store_1.provideStore({ selectedElements: selectedElements_reducer_1.selectedElements, rowData: rowData_reducer_1.rowData })]);
        }
    }
});
//# sourceMappingURL=main.js.map