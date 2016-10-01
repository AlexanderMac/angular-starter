'use strict';

var gulp     = require('gulp');
var jshint   = require('gulp-jshint');
var tslint   = require('gulp-tslint');
var gpuglint = require('gulp-pug-lint');
var filters  = require('../config/gulp').filters;
var paths    = require('../config/gulp').paths;

gulp.task('lint-app', () => {
  return gulp
    .src(paths.app + filters.tsDeep)
    .pipe(tslint({
      formatter: 'prose'
    }))
    .pipe(tslint.report({
      summarizeFailureOutput: true
    }));
});

gulp.task('lint-views', () => {
  return gulp
    .src(paths.app + filters.pugDeep)
    .pipe(gpuglint());
});

gulp.task('lint-tools', () => {
  return gulp
    .src([
      paths.config + filters.jsDeep,
      paths.tasks + filters.jsDeep
    ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('lint', ['lint-app', 'lint-views', 'lint-tools']);
