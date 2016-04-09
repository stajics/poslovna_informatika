import {Component, ViewChild, forwardRef, Inject} from 'angular2/core';

import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';

import {AgGridComponent} from '../ag-grid/ag-grid.component';
import {DetailPanelComponent} from '../detail-panel/detail-panel.component';

import {Store} from '@ngrx/store';
import {AppState} from '../common/redux/appState';

@Component({
  selector: 'my-next',
  templateUrl: 'app/next/next.component.html',
  directives: [forwardRef(() => AgGridComponent), forwardRef(() => DetailPanelComponent), MODAL_DIRECTIVES]
})
export class MyNextComponent {

  private _modalOwner;
  private _nextForeignKey;
  @ViewChild('modal') modal;
  @ViewChild('grid') grid;
  @ViewChild('panel') panel;
  constructor(private _store: Store<AppState>) {
  }

  //modalOwner - modal owner, nextForeignKey - modal owner foreign key (caller: mesto -> nextForeignKey: drzva)
  showNext(modalOwner, nextForeignKey, idValue) {
    if(modalOwner === 'osnovna_valuta'){
      modalOwner = 'kurs_u_valuti'
      nextForeignKey = 'osnovna_valuta';
    }
    if(modalOwner === 'prema_valuti'){
      modalOwner = 'kurs_u_valuti'
      nextForeignKey = 'prema_valuti';
    }
    this._modalOwner = modalOwner;
    this._nextForeignKey = nextForeignKey;
    this.grid.initNextGrid(modalOwner, nextForeignKey, idValue);
    this.panel.initNextPanel(modalOwner);
    this.modal.open();
  }

  closeModal() {
    this.myDispose();
  }
}
