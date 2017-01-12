# gulp-font64-json

Convert your fonts to base64 and saves them in a json file to use the faster-font-loading-technique described here: http://crocodillon.com/blog/non-blocking-web-fonts-using-localstorage

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)

## Installation
```
$ npm install --save-dev gulp-font64-json
```

or if you prefer yarn:
```
$ yarn add gulp-font64-json
```

## Usage
```js
const gulp        = require('gulp');
const font64json  = require('gulp-font64-json');

gulp.task('build-fonts', () => {
  return gulp.src('path/to/your/fonts/*')
    .pipe(font64json('fonts.json'))
    .pipe(gulp.dest('dest'));
});
```

## Development
```
$ npm test
```
