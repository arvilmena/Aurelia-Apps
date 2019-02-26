import {Router, RouterConfiguration} from 'aurelia-router';
import {inject, PLATFORM} from 'aurelia-framework';
import { WebAPI } from './web-api';

@inject(WebAPI) // injecting WebAPI to app.ts as this.api property, so that in our view we can use `api.isRequesting`
export class App {
  router: Router;

  constructor(public api: WebAPI) {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Contacts';
    config.map([
      {
        route: '',
        moduleId: PLATFORM.moduleName('no-selection'),
        title: 'Select'
      },
      {
        route: 'contacts/:id',
        moduleId: PLATFORM.moduleName('contact-detail'),
        name: 'contacts', 
      }
    ]);

    this.router = router;
  }
}
