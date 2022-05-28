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

const fileNotFoundError = (fileName) => {
  return { message: `head: ${fileName}: No such file or directory` };
};

const getFileContent = (readFile, fileName) => {
  const result = {};
  try {
    result.content = readFile(fileName, 'utf8');
    return result;
  } catch (error) {
    return fileNotFoundError(fileName);
  }
};

const headOfFile = (readFile, fileName, options) => {
  const result = getFileContent(readFile, fileName);
  result.fileName = fileName;
  if (result.message) {
    return result;
  }
  result.content = head(result.content, options);
  return result;
};

const getExitCode = (headsOfFiles) => {
  return +headsOfFiles.some(({ message }) => message);
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
