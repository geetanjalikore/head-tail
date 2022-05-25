const { split, join } = require('./stringUtils.js');

const lastNLines = (lines, count) => lines.slice(-count);

const lastLinesFrom = (lines, count) => lines.slice(count - 1);

const lastNBytes = (content, count) => content.slice(-count);

const lastBytesFrom = (content, count) => content.slice(count - 1);

const tail = (content, { option, count }) => {
  const regEx = /^\+\d+/;

  if (option === '-c' && regEx.test(count)) {
    return lastBytesFrom(content, +count);
  }
  if (option === '-c') {
    return lastNBytes(content, +count);
  }

  const lines = split(content);
  if (option === '-n' && regEx.test(count)) {
    return join(lastLinesFrom(lines, +count));
  }
  return join(lastNLines(lines, +count));
};

exports.tail = tail;
