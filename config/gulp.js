'use strict';

const APP    = './src/';
const DIST   = './dist';

let config = {
  filters: {
    js: '*.js',
    jsDeep: '**/*.js',
    ts: '*.ts',
    tsDeep: '**/*.ts',
    css: '*.css',
    cssDeep: '**/*.css',
    styl: '*.styl',
    stylDeep: '**/*.styl',
    pug: '*.pug',
    pugDeep: '**/*.pug'
  },

  paths: {
    app: APP,
    dist: DIST
  }
};

module.exports = config;
