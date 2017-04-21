'use strict';

const CONFIG = './config/';
const TASKS  = './tasks/';
const APP    = './src/';
const DIST   = './dist';

let config = {
  filters: {
    js: '*.js',
    jsDeep: '**/*.js',
    ts: '*.ts',
    tsDeep: '**/*.ts',
    // TODO: styl is used?
    styl: '*.styl',
    stylDeep: '**/*.styl',
    // TODO: css is used?
    css: '*.css',
    cssDeep: '**/*.css',
    pug: '*.pug',
    pugDeep: '**/*.pug'
  },

  paths: {
    config: CONFIG,
    tasks: TASKS,
    app: APP,
    dist: DIST
  }
};

module.exports = config;
