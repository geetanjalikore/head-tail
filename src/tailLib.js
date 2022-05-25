const { split, join } = require('./stringUtils.js');

const lastNLines = (content, count) => {
  const lines = split(content);
  const lastLines = lines.slice(-count);
  return join(lastLines);
};

const lastNBytes = (content, count) => content.slice(-count);

const tail = (content, { option, count }) => {
  if (option === '-c') {
    return lastNBytes(content, count);
  }
  return lastNLines(content, count);
};

exports.tail = tail;
