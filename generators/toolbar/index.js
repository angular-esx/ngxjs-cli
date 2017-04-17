<ngx-toolbar>
  <span>NGX</span>


  <span class="example-spacer"></span>
  <md-icon class="example-icon">favorite</md-icon>
  <md-icon class="example-icon">delete</md-icon>

</ngx-toolbar>

<ngx-toolbar>
  <ng-content select=".branch">

  </ng-content>

  <div class="space"></div>

  <ng-content select=".actions">

  </ng-content>
</ngx-toolbar>

