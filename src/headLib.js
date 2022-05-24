const { parseArgs } = require('./parseArgs.js');

const NEWLINE = '\n';

const split = (content) => content.split(NEWLINE);

const join = (lines) => lines.join(NEWLINE);

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

const formatRecord = (record) => {
  const heading = `==> ${record.fileName} <==`;
  return `${heading}\n${record.content}\n`;
};

const display = ({ log, err }, record, format) => {
  if (record.isError) {
    err(record.message);
    return;
  }
  format ? log(formatRecord(record)) : log(record.content);
};

const displayRecords = ({ log, err }, fileRecords) => {
  const format = fileRecords.length > 1 ? true : false;
  fileRecords.forEach((record) => display({ log, err }, record, format));
};

const headMain = (readFile, { log, err }, ...args) => {
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
  displayRecords({ log, err }, fileRecords);
  return exitCode;
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
exports.headMain = headMain;
