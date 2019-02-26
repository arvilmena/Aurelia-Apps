import { WebAPI } from './web-api';
import { inject } from 'aurelia-framework';
import { ContactViewed, ContactUpdated } from './message';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(WebAPI, EventAggregator)
export class ContactList {
  contacts;
  selectedId = 0;

  constructor(private api: WebAPI, private ea: EventAggregator) {
    ea.subscribe(ContactViewed, msg => {
      // console.log('subscribed ContactViewed:', msg);
      this.select(msg.contact);
    });
    ea.subscribe(ContactUpdated, msg => {
      // console.log('subscribed ContactUpdated:', msg);
      let id = msg.contact.id;
      let found = this.contacts.find(x => x.id === id);
      Object.assign(found, msg.contact);
    });
  }

  created() {
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }

  select(contact) {
    this.selectedId = contact.id;
    return true;
  }
}
