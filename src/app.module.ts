import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { ajsModule } from './app.module-ajs';

import { AppComponent } from './app/app.component';
import { ProjectsResolve } from './app/ng/projects/project.resolve';
import { ProjectsComponent } from './app/ng/projects/projects.component';
import { ProjectComponent } from './app/ng/project/project.component';
import { HomeComponent } from './app/ng/home/home.component';
import { EmptyComponent } from './app/ng/empty/empty.component';
import { setUpLocationSync } from '@angular/router/upgrade';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'home'
        },
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'projects',
          component: ProjectsComponent,
          resolve: {
            projectsResolve: ProjectsResolve
          },
          children: [
            {
              path: ':id',
              component: ProjectComponent
            }
          ]
        },
        {
          path: 'lazy',
          loadChildren: './app/ng/lazy#LazyModule'
        },
        {
          path: '**',
          component: EmptyComponent
        }
      ],
      { initialNavigation: false }
    )
  ],
  declarations: [
    AppComponent,
    ProjectsComponent,
    HomeComponent,
    EmptyComponent,
    ProjectComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return () => {
          return new Promise(resolve => setTimeout(resolve));
        };
      },
      multi: true
    },
    /*
    Dynamic set `document.base.href`
    provide: APP_BASE_HREF, useValue: '/test'
    */
    ProjectsResolve,
    {
      provide: 'ajs.location',
      useFactory($injector) {
        return $injector.get('$location');
      },
      deps: ['$injector']
    },
    {
      provide: '$state',
      useFactory($injector) {
        return $injector.get('$state');
      },
      deps: ['$injector']
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule, private router: Router) {
    upgrade.bootstrap(document.body, [ajsModule]);
    router.initialNavigation();
    setUpLocationSync(upgrade);
  }
}
