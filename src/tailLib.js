const { split, join } = require('./stringUtils.js');

const tail = (content, count) => {
  const lines = split(content).reverse();
  const lastLines = lines.slice(0, count).reverse();
  return join(lastLines);
};

exports.tail = tail;
