exports.tail = (content) => {
  const lines = content.split('\n').reverse();
  return lines.slice(0, 10).reverse().join('\n');
};
