const { split, join } = require('./stringUtils.js');

const firstNLines = (content, count) => {
  const lines = split(content);
  return join(lines.slice(0, count));
};

const firstNBytes = (content, count) => content.slice(0, count);

const head = (content, { count, bytes }) => {
  return bytes ? firstNBytes(content, bytes) : firstNLines(content, count);
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
