System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var rowData;
    return {
        setters:[],
        execute: function() {
            exports_1("rowData", rowData = function (state, action) {
                if (state === void 0) { state = {}; }
                switch (action.type) {
                    case 'SET_ROW_DATA':
                        var rowData = new Object();
                        rowData[action.payload.owner] = action.payload.data;
                        return Object.assign({}, state, rowData);
                    case 'ADD_ROW':
                        var newRowData = new Object();
                        newRowData[action.payload.owner] = state[action.payload.owner].concat([action.payload.data]);
                        return Object.assign({}, state, newRowData);
                    case 'DELETE_ROW':
                        var newRowData = new Object();
                        newRowData[action.payload.owner] = state[action.payload.owner].filter(function (el) {
                            var toFilter = false;
                            for (var key in el) {
                                if (el[key] !== action.payload.data[key])
                                    return toFilter = true;
                            }
                            return toFilter;
                        });
                        return Object.assign({}, state, newRowData);
                    case 'UPDATE_ROW':
                        var updatedRowData = new Object();
                        updatedRowData[action.payload.owner] = state[action.payload.owner].map(function (el) {
                            var isRowToUpdate = true;
                            for (var key in el) {
                                if (el[key] !== action.payload.oldData[key]) {
                                    isRowToUpdate = false;
                                }
                            }
                            if (isRowToUpdate)
                                return action.payload.newData;
                            else
                                return el;
                        });
                        return Object.assign({}, state, updatedRowData);
                    default:
                        return state;
                }
            });
        }
    }
});
//# sourceMappingURL=rowData.reducer.js.map