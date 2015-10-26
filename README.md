# Geordie Builders

This is a template engine to create simple project setups that use the M.E.A.N. Web Application design patter.
 
> MongoDB, Express, AngularJS and NodeJS.
> This project template engine also used Browserify, GULP, Karma, PhantomJS and Jasmine.

### To install:
```
sudo npm install -g geordie-builders
```

### For help:
```
geordie-builders help
```

### To run:
```
goerdie-builders
```
This will install to current folder.

```
geordie-builders -o <<filepath>>
```
This will install project to chosen filepath.

When Project is setup, do the following:
```
sudo npm install
bower install
gulp
```
to run DB for restful services:
```
npm run db
```

to start the server
```
npm start
```

to unit test
```
npm test
karma start
gulp test
```

For help with gulp tasks:
```
gulp help
```

Main tasks:
```
gulp
gulp build:test
gulp build:final
gulp build:final:test
gulp watch
gulp watch:copy
```

