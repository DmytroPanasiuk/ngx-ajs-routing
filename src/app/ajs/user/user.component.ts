import { StateService } from "@uirouter/angularjs";

class UserController {
  constructor(
    public $stateParams,
    private $state: StateService
  ) {}

  public navigateToAngularProject(projectId) {
    this.$state.go('projects.project', { id: projectId });
  }
}

export const userComponent = {
  template: require('./user.component.html'),
  controller: UserController
}
