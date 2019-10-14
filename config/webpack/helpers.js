const path = require('path');

const ROOT = path.resolve(__dirname, '../..');

exports.root = (...paths) => {
  return path.join(ROOT, ...paths);
};
