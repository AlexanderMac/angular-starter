import 'core-js/es';
import 'core-js/proposals/reflect-metadata';
import 'zone.js/dist/zone';

if (process.env.APP_ENV === 'production') {
  // TODO: Add actions for Production
} else {
  Error.stackTraceLimit = 5;
  require('zone.js/dist/long-stack-trace-zone');
}
