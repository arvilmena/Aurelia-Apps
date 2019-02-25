import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
export class App {
  router: Router;

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
