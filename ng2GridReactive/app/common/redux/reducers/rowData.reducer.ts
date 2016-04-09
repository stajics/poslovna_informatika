
import {Reducer, Action} from '@ngrx/store';

export const rowData: Reducer<any> = (state: any = {}, action: Action) => {

  switch (action.type) {
    case 'SET_ROW_DATA':
      var rowData = new Object();
      rowData[action.payload.owner] = action.payload.data;
      return Object.assign({}, state, rowData);

    case 'ADD_ROW':
      var newRowData = new Object();
      newRowData[action.payload.owner] = [...state[action.payload.owner], action.payload.data];
      return Object.assign({}, state, newRowData);

    case 'DELETE_ROW':
      var newRowData = new Object();
      newRowData[action.payload.owner] = state[action.payload.owner].filter(el => {
        var toFilter = false;
        for (let key in el) {
          if (el[key] !== action.payload.data[key]) return toFilter = true;
        }
        return toFilter;
      });
      return Object.assign({}, state, newRowData);

    case 'UPDATE_ROW':
      var updatedRowData = new Object();
      updatedRowData[action.payload.owner] = state[action.payload.owner].map(el => {
        var isRowToUpdate = true;
        for (let key in el) {
          if (el[key] !== action.payload.oldData[key]) {
            isRowToUpdate = false;
          }
        }
        if (isRowToUpdate) return action.payload.newData; else return el;
      });
      return Object.assign({}, state, updatedRowData);

    default:
      return state;
  }
}
