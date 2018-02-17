import { Resolve } from '@angular/router';

export class ProjectsResolve implements Resolve<string> {
  resolve(): Promise<string> {
    return Promise.resolve('from resolver');
  }
}
