import {Injectable} from 'angular2/core';

import {GridApi} from 'ag-grid/main';

import {Drzava} from '../models/drzava';

import {Store} from '@ngrx/store';
import {AppState} from '../common/redux/appState';

@Injectable()
export class GridService {
  constructor(
    private _store: Store<AppState>){
  }

  selectNext(gridApi: GridApi) {
    //Select first node if none selected
    if (gridApi.getSelectedNodes().length === 0) {
      gridApi.getModel().getRow(0).setSelected(true, true);
      return;
    }

    let rowIndex = gridApi.getSelectedNodes()[0].childIndex;
    let rowCount = gridApi.getModel().getRowCount();
    if (rowCount > rowIndex + 1) {
      gridApi.getModel().getRow(rowIndex + 1).setSelected(true, true);
    }
  }

  selectPrevious(gridApi: GridApi) {
    //Select first node if none selected
    if (gridApi.getSelectedNodes().length === 0) {
      gridApi.getModel().getRow(0).setSelected(true, true);
      return;
    }

    let rowIndex = gridApi.getSelectedNodes()[0].childIndex;
    if (-1 < rowIndex - 1) {
      gridApi.getModel().getRow(rowIndex - 1).setSelected(true, true);
    }
  }

  //select given JSON element
  selectElement(gridApi: GridApi, json) {
    gridApi.getModel().forEachNode(rowNode => {
      for(let key in json){
        if(rowNode.data[key].toString() !== json[key].toString()){
          return;
        }
      }
      rowNode.setSelected(true, true);
    });
  }

  //Set selected element in store
  updateSelected(gridApi: GridApi, _owner) {
    this._store.dispatch({type: 'SELECT_ELEMENT', payload: {data: gridApi.getSelectedRows()[0], owner: _owner}});
  }

  refreshView(gridApi: GridApi) {
    gridApi.refreshView();
  }
}
