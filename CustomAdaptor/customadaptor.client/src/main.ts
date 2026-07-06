import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';

// if (environment.production) {
//   enableProdMode();
// }

bootstrapApplication(App)
  .catch(err => console.error(err));
