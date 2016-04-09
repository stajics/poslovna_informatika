import {Component, OnInit, AfterViewInit, AfterContentInit, EventEmitter, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {NgForm}    from 'angular2/common';
import { RouteParams } from 'angular2/router';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

import {DetailPanelComponent} from '../detail-panel/detail-panel.component';
import {Drzava} from '../common/models/drzava';
import {MyNextComponent} from '../next/next.component';

import { DataService } from '../common/services/data.service';
import { GridService } from '../common/services/grid.service';


import {Store} from '@ngrx/store';
import {AppState} from '../common/redux/appState';
import {Observable} from 'rxjs';

import {_ids, _children} from '../common/models/enum';

declare var X2JS: any;

@Component({
  selector: 'my-ag-grid',
  templateUrl: 'app/ag-grid/ag-grid.component.html',
  directives: [AgGridNg2, DetailPanelComponent],
  providers: [GridService],
  inputs: ['clearSelectionOnInit', 'isInModal'],
  outputs: ['setTitle']
})
export class AgGridComponent implements OnInit {

  public columnDefs = [];
  public rowData: Observable<any>;
  private _tempColumnDefs = [];
  private _selectedElements: Observable<any>;

  private _owner: string;
  private _children: string[] = [];
  public state: string;
  private _gridOptions: GridOptions;
  private _showGrid = true;
  private _file;
  private _x2js = new X2JS();
  //inputs
  private modalOwner;
  private clearSelectionOnInit;
  private isInModal = false;
  //outputs
  private setTitle: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _dataService: DataService,
    private _gridService: GridService,
    private _routeParams: RouteParams,
    private _store: Store<AppState>,
    private _dcl: DynamicComponentLoader,
    private _elementRef: ElementRef,
    private _http: Http
    ) {
    // we pass an empty gridOptions in, so we can grab the api out
    this._gridOptions = <GridOptions>{};
    this.state = 'view';
  }

  ngOnInit() {
    this._owner = this._routeParams.get('_owner');

    if (this._owner && !this.isInModal) {
      this.refreshRowData(this._owner);
      this.setChildren(this._owner);
    }
  }

  refreshRowData(owner) {
    console.log("Refreshing Row Data in " + owner);
    this._dataService.getRowData(owner).subscribe(rowData => {
      this.rowData = this._store.select('rowData').map(rowData => rowData[owner]);
      this._gridOptions.api.setColumnDefs(this.generateColumnDefs(rowData, owner));
    });
  }

  //set children for next
  setChildren(owner) {
    this._children = _children[owner];
  }

  generateColumnDefs(rowData, owner) {
    let x = [];
    this._tempColumnDefs = [];
    for (let key in rowData[0]) {
      this._tempColumnDefs.push({ headerName: key, field: key });
    }
    this.columnDefs = this._tempColumnDefs;
    return this._tempColumnDefs;
  }

  ngAfterContentInit() {
    if (this._owner) {
      this._selectedElements = this._store.select('selectedElements');
      this.setTitle.emit(this._owner);
    }
    if (this.clearSelectionOnInit) {
      this._store.dispatch({ type: 'CLEAR_SELECTION' });
    }
  }

  gridReady() {
    if (this._owner) {
      setTimeout(() => {
        //this._gridOptions.api.setSortModel([{ colId: 'id', sort: 'desc' }]);
      }, 100);
    }
  }

  selectElement(element) {
    this._gridService.selectElement(this._gridOptions.api, element);
  }

  selectNext() {
    this._gridService.selectNext(this._gridOptions.api);
  }

  selectPrevious() {
    this._gridService.selectPrevious(this._gridOptions.api);
  }

  selectionChanged() {
    this._gridService.updateSelected(this._gridOptions.api, this._owner);
  }

  delete() {
    var selectedElementValue = [];
    this._selectedElements.take(1).subscribe(selectedElements => selectedElementValue = selectedElements[this._owner]);
    this._dataService.delete(this._owner, selectedElementValue).then(
      res => { this._store.dispatch({ type: 'CLEAR_SELECTION', payload: { owner: this._owner } }); },
      err => console.log(err)
      );
  }

  edit() {
    this.state = 'edit';
    this.selectionChanged();
  }

  view() {
    this.state = 'view';
  }

  initModalGrid(owner) {
    this._owner = owner;
    this.refreshRowData(owner);
  }

  initNextGrid(owner, nextForeignKey, idValue) {
    this._owner = owner;
    this.setChildren(this._owner);
    this._store.dispatch({ type: 'SET_CHILD_VALUE', payload: { data: idValue, childKey: nextForeignKey, owner: owner } });
    this._dataService.getRowData(this._owner).subscribe(rowData => {
      this.rowData =
      this._store.select('rowData')
        .map(rowData => rowData[this._owner].filter(row => row[nextForeignKey] === idValue));
      this._gridOptions.api.setColumnDefs(this.generateColumnDefs(rowData, owner));
    });
  }

  nextShow(modalOwner) {
    var selectedElementValue = {};
    this._selectedElements.take(1).subscribe(
      selectedElements => {
        selectedElementValue = selectedElements[this._owner]
        if (selectedElementValue === undefined) {
          selectedElementValue = { id: '' };
        }
      });

    this._dcl.loadNextToLocation(MyNextComponent, this._elementRef).then(
      ref => {
        setTimeout(() => {
          ref.instance.myDispose = function() { ref.dispose() };
          ref.instance.showNext(modalOwner, this._owner, selectedElementValue[_ids[this._owner]]);
        }, 0)
      });
  }

  test() {
    var x2js = new X2JS();
    this.getXmlFile().subscribe(
      data => {
        console.log(data)
        var jsonObj = x2js.xml_str2json(data);
        this.importFromNalog(jsonObj)
      },
      err => console.error(err),
      () => console.log('done')
      );

    //var xmlAsStr = x2js.json2xml_str({MT102 :{zaglavlje:'ID',stavka: [{x: 1},{x: 2}]}} );
    //console.log(xmlAsStr);
    //this.download("test.xml", xmlAsStr);
    //this.genRTGSandClearing();
    //this.readTextFile("file:///home/gnome/Documents/test/Untitled Document 1.txt");
    //this._store.dispatch({ type: 'SET_CHILD_VALUE', payload: { data: 'AAAA', childKey: 'drzava', owner: 'mesto' } });
    //this.rowData.take(1).subscribe(x => console.log("ROW DATA: " + x), err=>err, () => console.log("DONE!"));
    //this._selectedElements.take(1).subscribe(x => console.log("FROM GRID: " + x[this._owner].id), err=>err, () => console.log("DONE!"));
    //console.log("FROM SERVICE " + JSON.stringify(this._selectionService.getSelectedElements(this._owner)[0]));
    //console.log("SELECTED INFO " + JSON.stringify(this._gridService.selectedInfo(this._gridOptions.api)));
  }

  download(filename, content) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    pom.setAttribute('download', filename);
    pom.click();
  }

  readXmlFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          return allText;
        }
      }
    }
    rawFile.send(null);
  }

  getXmlFile() {
    return this._http.get('app/xml/' + this._file)
      .map((res: Response) => res.text()).take(1);

  }

  fileSelected(element) {
    this._file = element.target.files[0].name;
  }

  importFromNalog(nalog) {
    nalog = nalog.nalog;
    var izvod = {
      broj_stavke: nalog.ID_poruke,
      datum_prijema: nalog.datum_naloga,
      datum_valute: nalog.datum_valute,
      dnevno_stanje_racuna: 2,
      duznik_nalogodavac: nalog.duznik_nalogodavac,
      hitno: nalog.hitno,
      iznos: nalog.iznos,
      model_odobrenja: nalog.model_odobrenja,
      model_zaduzenja: nalog.model_zaduzenja,
      naseljeno_mesto: "",
      poverilac_primalac: nalog.poverilac_primalac,
      poziv_na_broj_odobrenja: nalog.poziv_na_broj_odobrenja,
      poziv_na_broj_zaduzenja: nalog.poziv_na_broj_zaduzenja,
      racun_duznika: nalog.racun_duznika,
      racun_poverioca: nalog.racun_poverioca,
      status: "1",
      svrha_placanja: nalog.svrha_placanja,
      tip_greske: "",
      valute: nalog.oznaka_valute,
      vrste_placanja: ""
    }
    console.log(izvod);
    this._dataService.add(this._owner, izvod)
      .then(
      res => {
        this.selectElement(izvod);
        return res
      },
      err => {
        console.log(err);
        return err
      })
  }

  genRTGSandClearing(){
    var selectedElementValue = [];
    this._selectedElements.take(1).subscribe(selectedElements => selectedElementValue = selectedElements[this._owner]);
    if(selectedElementValue['iznos'] < 250000 || selectedElementValue['hitno'] === 1){
      this.generateRTGS(selectedElementValue);
    }else{
      this.genClearing(selectedElementValue);
    }
  }

  genClearing(izvod){

  }

  generateRTGS(izvod){
    console.log('generate RTGS')
    console.log(izvod);
    var rtgs = {
      ID_poruke: izvod['broj_stavke'],
      svrha: izvod['svrha_placanja'],
      racun_duznika: izvod['racun_duznika'],
      racun_primaoca: izvod['racun_poverioca'],
      iznos: izvod['broj_stavke'],
      banka_primaoca: 'SWIFTBANKEPRIMAOCA',
      banka_duznika: 'SWIFTBANKEDUZNIKA'
    };
    this._dataService.add('rtgs', rtgs)
      .then(
      res => {

        console.log(res);
        var rtgsObj = {rtgs: res};
        var xmlAsStr = this._x2js.json2xml_str(rtgsObj);
        this.download("rtgs.xml", xmlAsStr);
        return res
      },
      err => {
        console.log(err);
        return err
      })
  }

  getIzvodIzvoda(){
    var selectedElementValue = [];
    this._selectedElements.take(1).subscribe(selectedElements => selectedElementValue = selectedElements[this._owner]);
    this._dataService.get('rtgs/izvodIzvoda' + selectedElementValue['broj_racuna'])
      .subscribe(
      res => {
        console.log(res);
        var izvodObj = {};
        var n=1;
        res[0].forEach(izvod =>{
          izvodObj['izvod' + n] = izvod;
          n++;
        })
        var xmlAsStr = this._x2js.json2xml_str({izvodi: izvodObj});
        this.download("izvodIzvoda.xml", xmlAsStr);
        return res
      },
      err => {
        console.log(err);
        return err
      })
  }
}
