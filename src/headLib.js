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

const display = ({ log, err }, fileContents) => {
  fileContents.forEach((fileContent) => {
    if (fileContent.isError) {
      err(fileContent.message);
      return;
    }
    log(fileContent.content);
  });
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

  const fileContents = fileNames.map((fileName) => {
    try {
      const content = head(readFile(fileName, 'utf8'), options);
      return {
        isError: false,
        content: content,
      };
    } catch (error) {
      exitCode = 1;
      return {
        isError: true,
        message: error.message,
      };
    }
  });

  display({ log, err }, fileContents);
  return exitCode;
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
exports.headMain = headMain;
