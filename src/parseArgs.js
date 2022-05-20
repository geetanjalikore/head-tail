const parseArgs = (args) => {
  const keys = { '-n': 'count', '-c': 'bytes' };
  const options = { count: 10, bytes: 0 };

  const fileName = args[args.length - 1];
  options[keys[args[0]]] = args[1];
  return [fileName, options];
};

exports.parseArgs = parseArgs;
