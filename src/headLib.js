const NEWLINE = '\n';

const split = (content) => content.split(NEWLINE);

const join = (lines) => lines.join(NEWLINE);

const firstLines = function (lines) {
  const start = 0;
  const count = 10;
  return lines.slice(start, count);
};

const head = function (content) {
  const lines = split(content);
  return join(firstLines(lines));
};

exports.firstLines = firstLines;
exports.head = head;
