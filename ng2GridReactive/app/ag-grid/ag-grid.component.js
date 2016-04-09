System.register(['angular2/core', 'angular2/http', 'angular2/router', 'ag-grid-ng2/main', '../detail-panel/detail-panel.component', '../next/next.component', '../common/services/data.service', '../common/services/grid.service', '@ngrx/store', '../common/models/enum'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, main_1, detail_panel_component_1, next_component_1, data_service_1, grid_service_1, store_1, enum_1;
    var AgGridComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            },
            function (detail_panel_component_1_1) {
                detail_panel_component_1 = detail_panel_component_1_1;
            },
            function (next_component_1_1) {
                next_component_1 = next_component_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            },
            function (grid_service_1_1) {
                grid_service_1 = grid_service_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (enum_1_1) {
                enum_1 = enum_1_1;
            }],
        execute: function() {
            AgGridComponent = (function () {
                function AgGridComponent(_dataService, _gridService, _routeParams, _store, _dcl, _elementRef, _http) {
                    this._dataService = _dataService;
                    this._gridService = _gridService;
                    this._routeParams = _routeParams;
                    this._store = _store;
                    this._dcl = _dcl;
                    this._elementRef = _elementRef;
                    this._http = _http;
                    this.columnDefs = [];
                    this._tempColumnDefs = [];
                    this._children = [];
                    this._showGrid = true;
                    this._x2js = new X2JS();
                    this.isInModal = false;
                    //outputs
                    this.setTitle = new core_1.EventEmitter();
                    // we pass an empty gridOptions in, so we can grab the api out
                    this._gridOptions = {};
                    this.state = 'view';
                }
                AgGridComponent.prototype.ngOnInit = function () {
                    this._owner = this._routeParams.get('_owner');
                    if (this._owner && !this.isInModal) {
                        this.refreshRowData(this._owner);
                        this.setChildren(this._owner);
                    }
                };
                AgGridComponent.prototype.refreshRowData = function (owner) {
                    var _this = this;
                    console.log("Refreshing Row Data in " + owner);
                    this._dataService.getRowData(owner).subscribe(function (rowData) {
                        _this.rowData = _this._store.select('rowData').map(function (rowData) { return rowData[owner]; });
                        _this._gridOptions.api.setColumnDefs(_this.generateColumnDefs(rowData, owner));
                    });
                };
                //set children for next
                AgGridComponent.prototype.setChildren = function (owner) {
                    this._children = enum_1._children[owner];
                };
                AgGridComponent.prototype.generateColumnDefs = function (rowData, owner) {
                    var x = [];
                    this._tempColumnDefs = [];
                    for (var key in rowData[0]) {
                        this._tempColumnDefs.push({ headerName: key, field: key });
                    }
                    this.columnDefs = this._tempColumnDefs;
                    return this._tempColumnDefs;
                };
                AgGridComponent.prototype.ngAfterContentInit = function () {
                    if (this._owner) {
                        this._selectedElements = this._store.select('selectedElements');
                        this.setTitle.emit(this._owner);
                    }
                    if (this.clearSelectionOnInit) {
                        this._store.dispatch({ type: 'CLEAR_SELECTION' });
                    }
                };
                AgGridComponent.prototype.gridReady = function () {
                    if (this._owner) {
                        setTimeout(function () {
                            //this._gridOptions.api.setSortModel([{ colId: 'id', sort: 'desc' }]);
                        }, 100);
                    }
                };
                AgGridComponent.prototype.selectElement = function (element) {
                    this._gridService.selectElement(this._gridOptions.api, element);
                };
                AgGridComponent.prototype.selectNext = function () {
                    this._gridService.selectNext(this._gridOptions.api);
                };
                AgGridComponent.prototype.selectPrevious = function () {
                    this._gridService.selectPrevious(this._gridOptions.api);
                };
                AgGridComponent.prototype.selectionChanged = function () {
                    this._gridService.updateSelected(this._gridOptions.api, this._owner);
                };
                AgGridComponent.prototype.delete = function () {
                    var _this = this;
                    var selectedElementValue = [];
                    this._selectedElements.take(1).subscribe(function (selectedElements) { return selectedElementValue = selectedElements[_this._owner]; });
                    this._dataService.delete(this._owner, selectedElementValue).then(function (res) { _this._store.dispatch({ type: 'CLEAR_SELECTION', payload: { owner: _this._owner } }); }, function (err) { return console.log(err); });
                };
                AgGridComponent.prototype.edit = function () {
                    this.state = 'edit';
                    this.selectionChanged();
                };
                AgGridComponent.prototype.view = function () {
                    this.state = 'view';
                };
                AgGridComponent.prototype.initModalGrid = function (owner) {
                    this._owner = owner;
                    this.refreshRowData(owner);
                };
                AgGridComponent.prototype.initNextGrid = function (owner, nextForeignKey, idValue) {
                    var _this = this;
                    this._owner = owner;
                    this.setChildren(this._owner);
                    this._store.dispatch({ type: 'SET_CHILD_VALUE', payload: { data: idValue, childKey: nextForeignKey, owner: owner } });
                    this._dataService.getRowData(this._owner).subscribe(function (rowData) {
                        _this.rowData =
                            _this._store.select('rowData')
                                .map(function (rowData) { return rowData[_this._owner].filter(function (row) { return row[nextForeignKey] === idValue; }); });
                        _this._gridOptions.api.setColumnDefs(_this.generateColumnDefs(rowData, owner));
                    });
                };
                AgGridComponent.prototype.nextShow = function (modalOwner) {
                    var _this = this;
                    var selectedElementValue = {};
                    this._selectedElements.take(1).subscribe(function (selectedElements) {
                        selectedElementValue = selectedElements[_this._owner];
                        if (selectedElementValue === undefined) {
                            selectedElementValue = { id: '' };
                        }
                    });
                    this._dcl.loadNextToLocation(next_component_1.MyNextComponent, this._elementRef).then(function (ref) {
                        setTimeout(function () {
                            ref.instance.myDispose = function () { ref.dispose(); };
                            ref.instance.showNext(modalOwner, _this._owner, selectedElementValue[enum_1._ids[_this._owner]]);
                        }, 0);
                    });
                };
                AgGridComponent.prototype.test = function () {
                    var _this = this;
                    var x2js = new X2JS();
                    this.getXmlFile().subscribe(function (data) {
                        console.log(data);
                        var jsonObj = x2js.xml_str2json(data);
                        _this.importFromNalog(jsonObj);
                    }, function (err) { return console.error(err); }, function () { return console.log('done'); });
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
                };
                AgGridComponent.prototype.download = function (filename, content) {
                    var pom = document.createElement('a');
                    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
                    pom.setAttribute('download', filename);
                    pom.click();
                };
                AgGridComponent.prototype.readXmlFile = function (file) {
                    var rawFile = new XMLHttpRequest();
                    rawFile.open("GET", file, false);
                    rawFile.onreadystatechange = function () {
                        if (rawFile.readyState === 4) {
                            if (rawFile.status === 200 || rawFile.status == 0) {
                                var allText = rawFile.responseText;
                                return allText;
                            }
                        }
                    };
                    rawFile.send(null);
                };
                AgGridComponent.prototype.getXmlFile = function () {
                    return this._http.get('app/xml/' + this._file)
                        .map(function (res) { return res.text(); }).take(1);
                };
                AgGridComponent.prototype.fileSelected = function (element) {
                    this._file = element.target.files[0].name;
                };
                AgGridComponent.prototype.importFromNalog = function (nalog) {
                    var _this = this;
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
                    };
                    console.log(izvod);
                    this._dataService.add(this._owner, izvod)
                        .then(function (res) {
                        _this.selectElement(izvod);
                        return res;
                    }, function (err) {
                        console.log(err);
                        return err;
                    });
                };
                AgGridComponent.prototype.genRTGSandClearing = function () {
                    var _this = this;
                    var selectedElementValue = [];
                    this._selectedElements.take(1).subscribe(function (selectedElements) { return selectedElementValue = selectedElements[_this._owner]; });
                    if (selectedElementValue['iznos'] < 250000 || selectedElementValue['hitno'] === 1) {
                        this.generateRTGS(selectedElementValue);
                    }
                    else {
                        this.genClearing(selectedElementValue);
                    }
                };
                AgGridComponent.prototype.genClearing = function (izvod) {
                };
                AgGridComponent.prototype.generateRTGS = function (izvod) {
                    var _this = this;
                    console.log('generate RTGS');
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
                        .then(function (res) {
                        console.log(res);
                        var rtgsObj = { rtgs: res };
                        var xmlAsStr = _this._x2js.json2xml_str(rtgsObj);
                        _this.download("rtgs.xml", xmlAsStr);
                        return res;
                    }, function (err) {
                        console.log(err);
                        return err;
                    });
                };
                AgGridComponent.prototype.getIzvodIzvoda = function () {
                    var _this = this;
                    var selectedElementValue = [];
                    this._selectedElements.take(1).subscribe(function (selectedElements) { return selectedElementValue = selectedElements[_this._owner]; });
                    this._dataService.get('rtgs/izvodIzvoda' + selectedElementValue['broj_racuna'])
                        .subscribe(function (res) {
                        console.log(res);
                        var izvodObj = {};
                        var n = 1;
                        res[0].forEach(function (izvod) {
                            izvodObj['izvod' + n] = izvod;
                            n++;
                        });
                        var xmlAsStr = _this._x2js.json2xml_str({ izvodi: izvodObj });
                        _this.download("izvodIzvoda.xml", xmlAsStr);
                        return res;
                    }, function (err) {
                        console.log(err);
                        return err;
                    });
                };
                AgGridComponent = __decorate([
                    core_1.Component({
                        selector: 'my-ag-grid',
                        templateUrl: 'app/ag-grid/ag-grid.component.html',
                        directives: [main_1.AgGridNg2, detail_panel_component_1.DetailPanelComponent],
                        providers: [grid_service_1.GridService],
                        inputs: ['clearSelectionOnInit', 'isInModal'],
                        outputs: ['setTitle']
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService, grid_service_1.GridService, router_1.RouteParams, store_1.Store, core_1.DynamicComponentLoader, core_1.ElementRef, http_1.Http])
                ], AgGridComponent);
                return AgGridComponent;
            }());
            exports_1("AgGridComponent", AgGridComponent);
        }
    }
});
//# sourceMappingURL=ag-grid.component.js.map