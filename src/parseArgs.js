const isByte = (option) => '-c' === option;

const isCount = (option) => '-n' === option;

const getOptions = function (args) {
  const keys = { '-n': 'count', '-c': 'bytes' };
  const options = { count: 10, bytes: 0 };
  let key;

  for (let index = 0; index < args.length - 1; index += 2) {
    if (isByte(args[index]) || isCount(args[index])) {
      key = keys[args[index]];
      options[key] = +args[index + 1];
    }
  }
  return options;
};

const parseArgs = (args) => {
  if (args.includes('-n') && args.includes('-c')) {
    throw {
      message: 'head: can\'t combine line and byte counts'
    };
  }
  const options = getOptions(args);
  const fileName = args[args.length - 1];
  return [fileName, options];
};

exports.parseArgs = parseArgs;
