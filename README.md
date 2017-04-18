This is a tool to generate layouts for ngxjs

### Installation
```npm install -g ngxjs-cli```


### Usages
```ngx g <Component> --main <layout> --toolbar --side-nav <left|right>```

Example:

Create ContactUs uses grid layout 4 rows, 3 cols

```ngx g ContactUs --main grid --rows 4 --cols 3```

Create ContactUs uses grid layout 4 rows, 3 cols, and has toolbar and left side nav

```ngx g ContactUs --main grid --rows 4 --cols 3 --toolbar --side-nav left```


### Development

1. Clone source
```git clone git@github.com:angular-esx/ngxjs-cli.git```

2. Go to project ```cd ngxjs-cli```

3. Install
```
npm install -g
npm install
npm link
```
