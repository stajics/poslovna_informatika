System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var selectedElements;
    return {
        setters:[],
        execute: function() {
            exports_1("selectedElements", selectedElements = function (state, action) {
                if (state === void 0) { state = {}; }
                switch (action.type) {
                    case 'SELECT_ELEMENT':
                        var element = new Object();
                        element[action.payload.owner] = action.payload.data;
                        return Object.assign({}, state, element);
                    case 'CLEAR_SELECTION':
                        var element = new Object();
                        if (action.payload === undefined) {
                            return Object.assign({});
                        }
                        else {
                            element[action.payload.owner] = {};
                        }
                        return Object.assign({}, state, element);
                    case 'SET_CHILD_VALUE':
                        var valueFromModal = new Object();
                        var editedElement = new Object();
                        valueFromModal[action.payload.childKey] = action.payload.data;
                        editedElement[action.payload.owner] = Object.assign({}, state[action.payload.owner], valueFromModal);
                        console.log(Object.assign({}, state, editedElement));
                        return Object.assign({}, state, editedElement);
                    default:
                        return state;
                }
            });
        }
    }
});
//# sourceMappingURL=selectedElements.reducer.js.map