import {Component, OnInit, EventEmitter, AfterContentInit, DynamicComponentLoader, ElementRef} from 'angular2/core';
import { RouteParams } from 'angular2/router';
import {NgForm}    from 'angular2/common';

import {MyModalComponent} from '../modal/modal.component';

import {DataService} from '../common/services/data.service';

import {Store} from '@ngrx/store';
import {AppState} from '../common/redux/appState';
import {Observable} from 'rxjs';

import {_ids, _children} from '../common/models/enum';

@Component({
  selector: 'my-detail-panel',
  templateUrl: 'app/detail-panel/detail-panel.component.html',
  inputs: ['state', 'isDisableFieldForNext'],
  outputs: ['selectElement', 'refreshRowData']
})
export class DetailPanelComponent implements OnInit {

  private _owner: string;
  private _selectedElements: Observable<any>;
  private _selectedElementValue: Object;
  private _caller: string;
  //inputs
  private state: string;
  private isDisableFieldForNext: boolean = false;

  //outputs
  private selectElement: EventEmitter<any> = new EventEmitter<any>();
  private refreshRowData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _routeParams: RouteParams,
    private _dataService: DataService,
    private _store: Store<AppState>,
    private _dcl: DynamicComponentLoader,
    private _elementRef: ElementRef
    ) {
  }

  ngOnInit() {
    this._owner = this._routeParams.get('_owner');
    this.state = 'view';

  }

  ngAfterContentInit() {
    if (this._owner) {
      this._selectedElements = this._store.select('selectedElements');
      this._selectedElements.subscribe(selectedElements => this._selectedElementValue = selectedElements[this._owner]);
    }
  }

  //save panel state (on open modal)
  savePanel(data) {
    this._store.dispatch({ type: 'SELECT_ELEMENT', payload: { data: data, owner: this._owner } });
  }

  onSubmit(value) {
    if (this.state === 'view') {
      console.log(value);
      this._dataService.add(this._owner, value)
        .then(
        res => {
          this.selectElement.emit(value);
          return res
        },
        err => {
          console.log(err);
          return err
        })
    }
    if (this.state === 'edit') {
      this._dataService.edit(this._owner, this._selectedElementValue, value)
        .then(
        res => {
          this.selectElement.emit(value);
          //if edit in modal update its children grids
          if (this._caller) {
            _children[this._owner].forEach(
              child => this._dataService.getRowData(this._caller).take(1).subscribe(data=> data)
              )
          };
          return res
        },
        err => {
          console.log(err);
          return err
        });
    }
  }

  modalShow(modalOwner) {
    this._dcl.loadNextToLocation(MyModalComponent, this._elementRef).then(
      ref => {
        setTimeout(() => {
          ref.instance.myDispose = function() {
            ref.dispose()
          };
          ref.instance.sectedElementFromCaller = this._selectedElementValue;
          ref.instance.selectElement = this.selectElement;
          ref.instance.showModal(modalOwner, this._owner);
        }, 0)
      });
  }

  selectionFromModal(owner, value) {
    this._store.dispatch({ type: 'SET_CHILD_VALUE', payload: { data: value[owner].id, childKey: owner, owner: this._owner } });
  }

  initModalPanel(modalOwner) {
    this._owner = modalOwner;
  }

  initNextPanel(modalOwner) {
    if(modalOwner === 'osnovna_valuta' || modalOwner === 'prema_valuti'){
      modalOwner = 'kurs_u_valuti'
    }
    this._owner = modalOwner;
    this.isDisableFieldForNext = true;
  }

  test() {
  }

}
