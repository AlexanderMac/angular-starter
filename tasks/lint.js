'use strict';

const gulp     = require('gulp');
const gtslint  = require('gulp-tslint');
const gpuglint = require('gulp-pug-lint');
const filters  = require('../config/gulp').filters;
const paths    = require('../config/gulp').paths;

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

gulp.task('lint', ['lint-app', 'lint-views']);
