const head = function (content) {
  const lines = content.split('\n');
  return lines.slice(0, 10).join('\n');
};

exports.head = head;
