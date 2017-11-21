import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';

@Component({
  selector: 'dp-project',
  template: require('./project.component.html')
})
export class ProjectComponent {
  public routeParams$: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.routeParams$ = Observable.combineLatest(this.route.params, this.route.queryParams)
      .map(([params, queryParams]) => ({ params, queryParams }));
  }

  public navigateToAngularJsUser(userId: string) {
    this.router.navigate(['/users', userId]);
  }
}