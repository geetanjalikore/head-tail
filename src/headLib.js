const NEWLINE = '\n';

const split = (content) => content.split(NEWLINE);

const join = (lines) => lines.join(NEWLINE);

const firstLines = (lines, count) => lines.slice(0, count);

const head = (content) => {
  const lines = split(content);
  return join(firstLines(lines, 10));
};

exports.firstLines = firstLines;
exports.head = head;
