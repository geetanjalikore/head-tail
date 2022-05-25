const { split, join } = require('./stringUtils.js');

const lastNLines = (lines, count) => lines.slice(-count);

const tail = (content, count) => {
  const lines = split(content);
  const lastLines = lastNLines(lines, count);
  return join(lastLines);
};

exports.tail = tail;
