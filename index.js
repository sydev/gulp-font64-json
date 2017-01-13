(() => {
  'use strict';

  const gutil   = require('gulp-util');
  const fs      = require('fs');
  const mime    = require('mime');
  const path    = require('path');
  const through = require('through2');

  module.exports = function(filepath) {

    let outputs = [];

    function base64AndMerge(file, enc, cb) {
      if (file.isNull()) {
  			this.push(file);
  			return cb();
  		}

  		if (file.isStream()) {
  			this.emit('error', new gutil.PluginError('gulp-font64json', 'Streaming not supported'));
  			return cb();
  		}

      if (file.isBuffer()) {
        let file64  = file.contents.toString('base64'),
          mtype     = mime.lookup(file.path),
          ext       = path.extname(file.path),
          filename  = path.basename(file.path, ext),
          output    = `@font-face {font-family: ${filename}; src: url(data:${mtype};base64,${file64})}`;

        outputs.push(output);

        file.contents = new Buffer(JSON.stringify({css: outputs.join('\n')}));
        file.path     = path.join(file.base, filepath);

        cb(null, file);
      }
    }

    return through.obj(base64AndMerge);
  };


})();
