const isByte = (option) => '-c' === option;

const isCount = (option) => '-n' === option;

const getOptions = function (args) {
  const keys = { '-n': 'count', '-c': 'bytes' };
  const options = { count: 10, bytes: 0 };
  let key;
  let index = 0;

  while (isByte(args[index]) || isCount(args[index])) {
    key = keys[args[index]];
    options[key] = +args[index + 1];
    index = index + 2;
  }
  return [options, index];
};

const parseArgs = (args) => {
  if (args.includes('-n') && args.includes('-c')) {
    throw {
      message: 'head: can\'t combine line and byte counts'
    };
  }
  const [options, index] = getOptions(args);
  const fileNames = args.slice(index);
  return [fileNames, options];
};

exports.parseArgs = parseArgs;
