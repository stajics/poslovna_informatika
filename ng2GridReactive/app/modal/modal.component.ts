import {Component, ViewChild, forwardRef, Inject, EventEmitter} from 'angular2/core';

import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';

import {AgGridComponent} from '../ag-grid/ag-grid.component';
import {DetailPanelComponent} from '../detail-panel/detail-panel.component';

import {Store} from '@ngrx/store';
import {AppState} from '../common/redux/appState';

import {_ids} from '../common/models/enum';

@Component({
  selector: 'my-modal',
  templateUrl: 'app/modal/modal.component.html',
  directives: [forwardRef(() => AgGridComponent), forwardRef(() => DetailPanelComponent), MODAL_DIRECTIVES]
})
export class MyModalComponent {

  private _modalOwner;
  private _caller;
  private _valueFromModal;
  private _childKey;
  myDispose;
  public sectedElementFromCaller;
  public selectElement: EventEmitter<any>;

  @ViewChild('modal') modal;
  @ViewChild('grid') grid;
  @ViewChild('panel') panel;
  constructor(private _store: Store<AppState>) {
  }

  //caller - modal parent, modalOwner - modal owner (caller: mesto -> modalOwner: drzva)
  showModal(modalOwner, caller) {
    this._childKey = modalOwner;
    if (modalOwner === 'osnovna_valuta') {
      modalOwner = 'valute'
      this._childKey = 'osnovna_valuta';
    }
    if (modalOwner === 'prema_valuti') {
      modalOwner = 'valute'
      this._childKey = 'prema_valuti';
    }
    this._modalOwner = modalOwner;
    this._caller = caller;
    this.grid.initModalGrid(modalOwner);
    this.panel.initModalPanel(modalOwner);
    this.panel._caller = caller;
    this.modal.open();
  }

  setValueFromModal() {
    if (this.sectedElementFromCaller[Object.keys(this.sectedElementFromCaller)[0]] !== null) {
      this.selectElement.emit(this.sectedElementFromCaller);
    }
    setTimeout(() => {
      this._store.select('selectedElements').take(1)
        .subscribe(selectedElements => {
        this._valueFromModal = selectedElements[this._modalOwner][_ids[this._modalOwner]]
        this._store.dispatch({ type: 'SET_CHILD_VALUE', payload: { data: this._valueFromModal, childKey: this._childKey, owner: this._caller } });
      });
      this.closeModal();
    }, 100);
  }

  cancel() {
    if (this.sectedElementFromCaller[Object.keys(this.sectedElementFromCaller)[0]] !== null) {
      this.selectElement.emit(this.sectedElementFromCaller);
    }
    this.closeModal();
  }

  closeModal() {
    this.myDispose();
  }
}
