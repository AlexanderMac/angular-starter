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
    styl: '*.styl',
    stylDeep: '**/*.styl',
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
