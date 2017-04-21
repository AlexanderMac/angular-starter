'use strict';

let gulp     = require('gulp');
let gjshint  = require('gulp-jshint');
let gtslint  = require('gulp-tslint');
let gpuglint = require('gulp-pug-lint');
let filters  = require('../config/gulp').filters;
let paths    = require('../config/gulp').paths;

gulp.task('lint-app', () => {
  return gulp
    .src(paths.app + filters.tsDeep)
    .pipe(gtslint({
      formatter: 'stylish'
    }))
    .pipe(gtslint.report({
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
    .pipe(gjshint('.jshintrc'))
    .pipe(gjshint.reporter('jshint-stylish'))
    .pipe(gjshint.reporter('fail'));
});

gulp.task('lint', ['lint-app', 'lint-views', 'lint-tools']);
