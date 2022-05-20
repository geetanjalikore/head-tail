const { split, join } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const firstNLines = (content, count) => {
  const lines = split(content);
  return join(lines.slice(0, count));
};

const firstNBytes = (content, count) => content.slice(0, count);

const head = (content, { count, bytes }) => {
  return bytes ? firstNBytes(content, bytes) : firstNLines(content, count);
};

const headMain = (readFile, ...args) => {
  const [fileName, options] = parseArgs(args);
  const content = readFile(fileName, 'utf8');
  return head(content, options);
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
exports.headMain = headMain;
