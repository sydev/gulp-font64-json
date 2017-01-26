(() => {
  'use strict';

  const gutil   = require('gulp-util');
  const fs      = require('fs');
  const mime    = require('mime');
  const path    = require('path');
  const through = require('through2');

  module.exports = function(filepath) {

    let outputs = [];

    /**
     * title-case a string
     * @param  {String} str input string
     * @return {String}     title-cased output string
     */
    function titleCase(str) {
      let splitStr = str.toLowerCase().split(' '),
        i = 0,
        len = splitStr.length;

      for (; i < len; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }

      return splitStr.join(' ');
    }

    /**
     * Convert the font file to a base64-string and merge with previous fonts
     * @param  {Object}   file input file
     * @param  {String}   enc  encoding of the file
     * @param  {Function} cb   callback function
     */
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
          fontname  = titleCase(path.basename(file.path, ext).replace(/(-|_)/g, ' ')),
          output    = `@font-face {font-family: '${fontname}'; src: url(data:${mtype};base64,${file64})}`;

        outputs.push(output);

        file.contents = new Buffer(JSON.stringify({css: outputs.join('\n')}));
        file.path     = path.join(file.base, filepath);

        cb(null, file);
      }
    }

    return through.obj(base64AndMerge);
  };


})();
