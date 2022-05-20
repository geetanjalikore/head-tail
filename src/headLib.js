const NEWLINE = '\n';

const split = (content) => content.split(NEWLINE);

const join = (lines) => lines.join(NEWLINE);

const head = function (content) {
  const lines = split(content);
  const firstLines = lines.slice(0, 10);
  return join(firstLines);
};

exports.head = head;
