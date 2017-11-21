import { StateService } from '@uirouter/angularjs';

class UsersController {
  constructor(private $state: StateService) {}

  navigateToAngular(): void {
    this.$state.go('projects.project', { id: 123 }, { reload: true });
  }
}


export const usersComponent = {
  template: require('./users.component.html'),
  controller: UsersController
}