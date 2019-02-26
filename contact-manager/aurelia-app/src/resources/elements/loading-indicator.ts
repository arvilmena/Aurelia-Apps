import { bindable, noView, PLATFORM } from 'aurelia-framework';
import * as nprogress from 'nprogress';
import 'nprogress/nprogress.css';

@noView
export class LoadingIndicator {
  @bindable loading = false;

  loadingChanged(newValue) {
    if (newValue) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }
}
