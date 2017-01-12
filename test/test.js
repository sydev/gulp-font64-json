(() => {
  'use strict';

  const assert  = require('assert');
  const es      = require('event-stream');
  const File    = require('vinyl');

  const font64json = require('../index');

  describe('gulp-font64json', () => {
    it ('should ', (done) => {

      let fakeFile  = new File({contents: new Buffer('abcdefghi'), path: process.cwd()}),
        fj          = font64json('test.json');

      fj.write(fakeFile);

      fj.once('data', (file) => {
        assert(file.isBuffer());

        assert.equal(file.contents.toString('utf8'), '{"css":"@font-face {font-family: gulp-font64-json; src: url(data:application/octet-stream;base64,YWJjZGVmZ2hp)}"}');
        done();
      });
    });
  });
})();
