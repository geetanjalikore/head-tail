const { parseArgs } = require('./parseArgs.js');

const NEWLINE = '\n';

const split = (content) => content.split(NEWLINE);

const join = (lines) => lines.join(NEWLINE);

const firstNBytes = (content, count) => content.slice(0, count);

const firstNLines = (content, count) => {
  const lines = split(content);
  return join(lines.slice(0, count));
};

const head = (content, { option, value }) => {
  if (option === '-c') {
    return firstNBytes(content, value);
  }
  return firstNLines(content, value);
};

const formatDisplay = (log, record) => {
  const heading = `==> ${record.fileName} <==`;
  log(`${heading}\n${record.content}\n`);
};

const display = ({ log, err }, record, format) => {
  if (record.isError) {
    err(record.message);
    return;
  }
  format ? formatDisplay(log, record) : log(record.content);
};

const displayRecords = ({ log, err }, fileRecords) => {
  const format = fileRecords.length > 1 ? true : false;
  fileRecords.forEach((record) => display({ log, err }, record, format));
};

const headMain = (readFile, { log, err }, ...args) => {
  let fileNames, options, exitCode = 0;
  try {
    [fileNames, options] = parseArgs(args);
  } catch (error) {
    err(error.message);
    exitCode = 1;
    return exitCode;
  }

  const fileRecords = fileNames.map((fileName) => {
    try {
      const content = head(readFile(fileName, 'utf8'), options);
      return {
        fileName: fileName,
        isError: false,
        content: content,
      };
    } catch (error) {
      exitCode = 1;
      return {
        fileName: fileName,
        isError: true,
        message: error.message,
      };
    }
  });

  displayRecords({ log, err }, fileRecords);
  return exitCode;
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
exports.headMain = headMain;
