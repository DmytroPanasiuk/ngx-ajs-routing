import { NgModule, Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppComponent } from './app/app.component';
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
    ])
  ],
  declarations: [
    AppComponent,
    ProjectsComponent,
    HomeComponent,
    EmptyComponent,
    ProjectComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}