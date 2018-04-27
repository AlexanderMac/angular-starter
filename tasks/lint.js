'use strict';

const gulp     = require('gulp');
const gtslint  = require('gulp-tslint');
const gpuglint = require('gulp-pug-lint');
const tslint   = require('tslint');
const filters  = require('../config/gulp').filters;
const paths    = require('../config/gulp').paths;

gulp.task('lint-app', () => {
  let program = tslint.Linter.createProgram('./tsconfig.json');
  return gulp
    .src(paths.app + filters.tsDeep)
    .pipe(gtslint({
      program,
      formatter: 'stylish'
    }))
    .pipe(gtslint.report({
      allowWarnings: true,
      summarizeFailureOutput: true
    }));
});

gulp.task('lint-views', () => {
  return gulp
    .src(paths.app + filters.pugDeep)
    .pipe(gpuglint());
});

gulp.task('lint', ['lint-app', 'lint-views']);
