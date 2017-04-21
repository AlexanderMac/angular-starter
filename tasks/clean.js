'use strict';

let gulp   = require('gulp');
let rimraf = require('rimraf');
let paths  = require('../config/gulp').paths;

gulp.task('clean', cb => {
  rimraf(paths.dist, cb);
});
