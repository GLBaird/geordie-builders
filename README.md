# Geordie Builders

This is a template engine to create simple project setups that use the M.E.A.N. Web Application design patter.
 
> MongoDB, Express, AngularJS and NodeJS.
> This project template engine also used Browserify, GULP, Karma, PhantomJS and Jasmine.

[![Video Demo Youtube](http://img.youtube.com/vi/5K6aDX1N9pI/0.jpg)](https://www.youtube.com/watch?v=5K6aDX1N9pI)

### To install:
```
sudo npm install -g geordie-builders
```

### For help:
```
geordiebuilders help
```

### To run:
```
goerdiebuilders
```
This will install to current folder.

```
geordiebuilders -o <<filepath>>
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

