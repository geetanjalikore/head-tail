const NEWLINE = '\n';

const split = (content) => content.split(NEWLINE);

const join = (lines) => lines.join(NEWLINE);

const firstLines = (lines, count) => lines.slice(0, count);

const firstBytes = (line, count) => line.slice(0, count);

const head = (content, options) => {
  const lines = split(content);
  const key = 'numOfLines';
  if (options[key]) {
    return join(firstLines(lines, options[key]));
  }
  return firstBytes(lines[0], options['bytes']);
};

exports.firstLines = firstLines;
exports.head = head;
