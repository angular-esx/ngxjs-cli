import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '{{baseComponentFile}}',
  templateUrl: './templates/{{baseComponentFile}}.component.html',
  styleUrls: ['./styles/{{baseComponentFile}}.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: '{{baseComponentFile}}',
  },
})
export class {{baseComponent}}Component {
  constructor() { }
}
