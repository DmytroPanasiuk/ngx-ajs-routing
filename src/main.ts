import * as angular from 'angular';
import '@uirouter/angularjs';

import 'core-js';
import 'zone.js';

import './main.less';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { UpgradeModule } from '@angular/upgrade/static';
import { setUpLocationSync } from '@angular/router/upgrade';
import { ajsModule } from './app.module-ajs';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(platformRef => {
    const upgrade = platformRef.injector.get(UpgradeModule);

    upgrade.bootstrap(document.body, [ajsModule]);
    setUpLocationSync(upgrade);
  });