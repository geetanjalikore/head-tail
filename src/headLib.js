const { parseArgs } = require('./parseHeadArgs.js');
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

const headOfFile = (readFile, fileName, options) => {
  try {
    const headOfFile = head(readFile(fileName, 'utf8'), options);
    return {
      fileName: fileName,
      isError: false,
      content: headOfFile
    };
  } catch (err) {
    return {
      fileName: fileName,
      isError: true,
      message: err.message
    };
  }
};

const getExitCode = (headsOfFiles) => {
  return headsOfFiles.some(({ isError }) => isError) ? 1 : 0;
};

const headMain = (readFile, { log, error }, ...args) => {
  const [fileNames, options] = parseArgs(args);
  const headsOfFiles = fileNames.map(
    fileName => headOfFile(readFile, fileName, options)
  );

  displayRecords({ log, error }, headsOfFiles);
  return getExitCode(headsOfFiles);
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
exports.headMain = headMain;
