const { split, join, slice, START } = require('./stringUtils.js');

const head = (content, options) => {
  const lines = split(content);
  const key = 'numOfLines';
  if (options[key]) {
    return join(slice(lines, options[key]));
  }
  return slice(lines[START], options['bytes']);
};

exports.head = head;
