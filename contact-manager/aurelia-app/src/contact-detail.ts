import { WebAPI } from './web-api';
import {inject} from 'aurelia-framework';
import {areEqual} from './utility';

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
}

@inject(WebAPI) // Dependency injecting.
export class ContactDetail {
  routeConfig;
  contact: Contact;
  originalContact: Contact;

  constructor(private api: WebAPI) {}

  // before `router` is about to activate the component.
  // router passes the route parameters to component and accessible via routeConfig.
  activate(params, routeConfig) { 
    this.routeConfig = routeConfig;

    // ------------
    // -- params --
    // ------------
    // 1. using the :id of our query param, pass it to
    // getContactDetails() function of WebAPI service,
    // which loads the selected contact.
    // 2. getContactDetails returns a Promise, which we will wait
    // then store the loaded contact to this.contact property.
    // 3. We copy the loaded contact to this.originalContact property. 
    // -----------------
    // -- routeConfig --
    // -----------------
    // 1 this has the same configuration as the object specifically for `route: "contacts/:id"`
    // we created to configure the router inside configureRouter() in app.ts
    // you can check with: console.log('routeConfig', routeConfig);
    // 2 The router generates a `navModel` for each `routeConfig`.
    // Using the `routerConfig.navModel` we can dynamically set the title of the document
    // for this route using `navModel.setTitle()`, at this case we pass the name of the contact.
    return this.api.getContactDetails(params.id).then(contact => {
      this.contact = <Contact>contact;
      this.routeConfig.navModel.setTitle(this.contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(this.contact));
    });
  }
  
  // a hook. called before navigating away from the current component.
  // an opportunity to cancel navigation.
  // 1. compare `originalContact` to current `contact` using `areEqual()` function from `./utility.ts`
  // to check if user did any changes to the original data of the contact.
  // 1.1 If they have changes, we show a confirmation dialog to make sure they want to navigate away.
  // 2. If `canDeactivate()` hook returned `true` then can navigate away, if `false` navigating away
  // is cancelled.
  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)) {
      return confirm('You have unsaved changes. Are you sure you wish to leave?');
    }
    return true;
  }

  // computed property, which we'll use in the view.
  // will help show some simple feedback to the user to indicate whether the UI
  // and data are in a state that allows for saving.
  get canSave() {
    return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
  }

  save() {
    this.api.saveContact(this.contact).then(contact => {
      this.contact = <Contact>contact;
      this.routeConfig.navModel.setTitle(this.contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(this.contact));
    });
  }
}
