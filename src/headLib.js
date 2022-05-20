const NEWLINE = '\n';

const split = (content) => content.split(NEWLINE);

const join = (lines) => lines.join(NEWLINE);

const firstLines = (lines, count) => lines.slice(0, count);

const head = (content, { count }) => {
  const lines = split(content);
  return join(firstLines(lines, count));
};

exports.firstLines = firstLines;
exports.head = head;
