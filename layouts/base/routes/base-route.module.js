import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { {{baseComponent}}Component } from '../{{baseComponentFile}}.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '{{baseComponentFile}}',
        component: {{baseComponent}}Component,
      },
    ]),
  ],
  exports: [ RouterModule ],
})
export class {{baseComponent}}RouteModule {}
