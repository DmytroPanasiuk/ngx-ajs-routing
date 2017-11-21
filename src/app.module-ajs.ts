import { usersComponent } from './app/ajs/users/users.component';
import { userComponent } from './app/ajs/user/user.component';

declare const angular: any;

export const ajsModule = angular.module('app', ['ui.router'])
  .config(($stateProvider, $locationProvider) => {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('users', { url: '/users', component: 'users' })
      .state('users.user', { url: '/:id?queryParam', component: 'user' })
      // Stubs for angular: start
      .state('projects', { url: '/projects?name&surname', template: '' })
      .state('projects.project', { url: '/:id', template: '' })
      // Stubs for angular: end
      .state('sink', { url: '/*path', template: '' });
  })
  .component('users', usersComponent)
  .component('user', userComponent)
  .name;
  