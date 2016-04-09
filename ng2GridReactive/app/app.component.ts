import {Component} from 'angular2/core';

import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {ContentWrapComponent} from './content-wrap/content-wrap.component';

import { DataService } from './common/services/data.service';


@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',

  directives: [ContentWrapComponent, ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, DataService]
})
@RouteConfig([
  {
    path: '/:_owner',
    name: 'Content',
    component: ContentWrapComponent
  },
])
export class AppComponent {
}
