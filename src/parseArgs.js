const isIllegalOption = (option) => {
  return !(option.startsWith('-n') || option.startsWith('-c'));
};

const isOption = (arg) => /^-/.test(arg);

const splitOption = (arg) => {
  if (isFinite(arg)) {
    return ['-n', Math.abs(arg)];
  }
  const option = arg.substring(0, 2);
  const count = arg.substring(2);
  return [option, count];
};

const splitArgs = (params) => {
  const args = [];
  let index = 0;

  while (index < params.length) {
    if (isOption(params[index])) {
      const [option, count] = splitOption(params[index]);
      count !== '' ? args.push(option, count) : args.push(option);
    } else {
      args.push(params[index]);
    }
    index = index + 1;
  }
  return args;
};

const illegalOptionError = (option) => {
  return {
    message:
      `head: illegal option -- ${option}\n` +
      'usage: head[-n lines | -c bytes][file ...]'
  };
};

const argToOptionError = (option) => {
  return {
    message: `head: option requires an argument -- ${option}\n` +
      'usage: head[-n lines | -c bytes][file ...]'
  };
};

const combinationError = () => {
  return { message: 'head: can\'t combine line and byte counts' };
};

const noFileError = () => {
  return { message: 'usage: head[-n lines | -c bytes][file ...]' };
};

const illegalCountError = (option, count) => {
  const type = option === '-c' ? 'byte' : 'line';
  return { message: `head: illegal ${type} count -- ${count}` };
};

const isIllegalCount = (count) => !isFinite(count) || count < 1;

const validateOption = (option, count) => {
  if (isIllegalOption(option)) {
    throw illegalOptionError(option);
  }
  if (count === undefined) {
    throw argToOptionError(option);
  }
  if (isIllegalCount(count)) {
    throw illegalCountError(option, count);
  }
};

const getOptions = function (args) {
  const options = { option: '-n', count: 10 };
  let index = 0;

  while (isOption(args[index])) {
    const option = args[index];
    const count = args[index + 1];

    validateOption(option, count);

    options.option = option;
    options.count = +count;

    index = index + 2;
  }
  return [options, index];
};

const parseArgs = (params) => {
  const args = splitArgs(params);

  if (args.includes('-n') && args.includes('-c')) {
    throw combinationError();
  }

  const [options, index] = getOptions(args);
  const fileNames = args.slice(index);

  if (fileNames.length < 1) {
    throw noFileError();
  }
  return [fileNames, options];
};

exports.parseArgs = parseArgs;
exports.splitOption = splitOption;
exports.splitArgs = splitArgs;
exports.getOptions = getOptions;
