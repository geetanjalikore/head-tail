const { split, join } = require('./stringUtils.js');

const tail = (content) => {
  const lines = split(content).reverse();
  const lastLines = lines.slice(0, 10).reverse();
  return join(lastLines);
};

exports.tail = tail;
