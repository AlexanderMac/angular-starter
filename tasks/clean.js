'use strict';

var gulp   = require('gulp');
var rimraf = require('rimraf');
var paths  = require('../config/gulp').paths;

gulp.task('clean', cb => {
  rimraf(paths.dist, cb);
});
