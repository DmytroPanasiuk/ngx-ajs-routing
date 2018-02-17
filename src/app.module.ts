import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppComponent } from './app/app.component';
import { ProjectsResolve } from './app/ng/projects/project.resolve';
import { ProjectsComponent } from './app/ng/projects/projects.component';
import { ProjectComponent } from './app/ng/project/project.component';
import { HomeComponent } from './app/ng/home/home.component';
import { EmptyComponent } from './app/ng/empty/empty.component';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    RouterModule.forRoot([
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
        path: '**',
        component: EmptyComponent
      }
    ], { initialNavigation: false })
  ],
  declarations: [
    AppComponent,
    ProjectsComponent,
    HomeComponent,
    EmptyComponent,
    ProjectComponent
  ],
  providers: [
    /*
    Dynamic set `document.base.href`
    provide: APP_BASE_HREF, useValue: '/test'
    */
    ProjectsResolve,
    {
      provide: 'ajs.location',
      useFactory($injector) {
        return $injector.get('$location')
      },
      deps: ['$injector']
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
