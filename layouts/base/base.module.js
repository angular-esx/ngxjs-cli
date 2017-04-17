import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import { {{baseComponent}} }   from './{{baseComponentFile}}.component';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [ ]
})
export class {{baseModule}} { }
