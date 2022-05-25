const { parseArgs } = require('./parseArgs.js');
const { displayRecords } = require('./displayUtils.js');
const { split, join } = require('./stringUtils.js');

const firstNBytes = (content, count) => content.slice(0, count);

const firstNLines = (content, count) => {
  const lines = split(content);
  return join(lines.slice(0, count));
};

const head = (content, { option, count }) => {
  if (option === '-c') {
    return firstNBytes(content, count);
  }
  return firstNLines(content, count);
};

const headMain = (readFile, { log, error }, ...args) => {
  let exitCode = 0;
  const [fileNames, options] = parseArgs(args);
  const fileRecords = fileNames.map((fileName) => {
    try {
      const content = head(readFile(fileName, 'utf8'), options);
      return { fileName: fileName, isError: false, content: content };
    } catch (err) {
      exitCode = 1;
      return { fileName: fileName, isError: true, message: err.message };
    }
  });
  displayRecords({ log, error }, fileRecords);
  return exitCode;
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
exports.headMain = headMain;
