import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import 'rxjs/Rx';

import {provideStore} from '@ngrx/store';

import {selectedElements} from './common/redux/reducers/selectedElements.reducer';
import {rowData} from './common/redux/reducers/rowData.reducer';

bootstrap(AppComponent, [provideStore({selectedElements, rowData})]);
