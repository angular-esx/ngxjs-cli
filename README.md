This is a tool to generate layouts for ngxjs

### Installation
```npm install -g ngxjs-cli```

### Usages
```ngx g <Page> --main layout --toolbar --side-nav "left|right"```

Example:

Create ContactUs uses grid layout 4 rows, 3 cols

```ngx g ContactUs --main grid --rows 4 --cols 3```

Create ContactUs uses grid layout 4 rows, 3 cols, and has toolbar and left side nav

```ngx g ContactUs --main grid --rows 4 --cols 3 --toolbar --side-nav left```


