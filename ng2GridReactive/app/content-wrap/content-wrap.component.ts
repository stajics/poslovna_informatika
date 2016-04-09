import {Component} from 'angular2/core';
import {AgGridComponent} from '../ag-grid/ag-grid.component';
import {DetailPanelComponent} from '../detail-panel/detail-panel.component';

@Component({
  selector: 'my-content-wrap',
  templateUrl: '/app/content-wrap/content-wrap.component.html',
  directives: [AgGridComponent, DetailPanelComponent]
})
export class ContentWrapComponent {

  private _title = "Welcome";
  
  test() {
  }
}
