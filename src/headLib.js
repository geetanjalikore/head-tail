const { parseArgs } = require('./parseArgs.js');

const NEWLINE = '\n';

const split = (content) => content.split(NEWLINE);

const join = (lines) => lines.join(NEWLINE);

const firstNBytes = (content, count) => content.slice(0, count);

const firstNLines = (content, count) => {
  const lines = split(content);
  return join(lines.slice(0, count));
};

const head = (content, { count, bytes }) => {
  return bytes ? firstNBytes(content, bytes) : firstNLines(content, count);
};

const headMain = (readFile, ...args) => {
  let fileNames, options;
  try {
    [fileNames, options] = parseArgs(args);
  } catch (error) {
    return error.message;
  }

  if (fileNames.length < 1 || args[0] === '--help') {
    return 'usage: head[-n lines | -c bytes][file ...]';
  }

  return fileNames.map((fileName) => {
    try {
      return head(readFile(fileName, 'utf8'), options);
    } catch (error) {
      return error.message;
    }
  }).join('\n');
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
exports.headMain = headMain;
