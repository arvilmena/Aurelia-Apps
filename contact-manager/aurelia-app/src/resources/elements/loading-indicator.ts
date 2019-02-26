import { bindable, noView, PLATFORM } from 'aurelia-framework';
import * as nprogress from 'nprogress';
import 'nprogress/nprogress.css';

@noView // we don't need Aurelia to render this component, no loading-indicator.html
export class LoadingIndicator {
  // a decorator.
  // 1. we want our HTML element to have `loading` property that we can bind to,
  // this is done via HTML attribute in the DOM.
  // 2. When there's `bindable` we can optionally declare a `propertyNameChanged` method
  // that will be called whenever the binding system updates the property.
  // 3. With loading property binded we can toggle NProgress off/on based on the value
  // of this property.
  @bindable loading = false;

  loadingChanged(newValue) {
    if (newValue) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }
}
