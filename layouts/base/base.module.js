import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { {{baseComponent}}Component } from './{{baseComponentFile}}.component';
import { {{baseComponent}}RouteModule } from './routes';

@NgModule({
  imports:      [ CommonModule, {{baseComponent}}RouteModule ],
  declarations: [ {{baseComponent}}Component ],
  exports:      [ ],
  providers:    [ ]
})
export class {{baseComponent}}Module { }
