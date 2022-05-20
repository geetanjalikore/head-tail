const NEWLINE = '\n';
const START = 0;

exports.split = (content) => content.split(NEWLINE);

exports.join = (lines) => lines.join(NEWLINE);

exports.slice = (content, index) => content.slice(START, index);

exports.START = START;
