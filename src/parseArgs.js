const isIllegalCount = (value) => !isFinite(value) || value < 1;

const isIllegalOption = (option) =>
  !(option.startsWith('-n') || option.startsWith('-c'));

const isOption = (arg) => /^-/.test(arg);

const splitOption = (arg) => {
  if (isFinite(arg)) {
    return ['-n', Math.abs(arg)];
  }
  const option = arg.substring(0, 2);
  const value = arg.substring(2);
  return [option, value];
};

const splitArgs = (params) => {
  const args = [];
  let index = 0;

  while (index < params.length) {
    if (params[index].startsWith('-')) {
      const [option, value] = splitOption(params[index]);
      value !== '' ? args.push(option, value) : args.push(option);
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

const illegalCountError = (option, value) => {
  const type = option === '-c' ? 'byte' : 'line';
  return { message: `head: illegal ${type} count -- ${value}` };
};

const validateOption = (option, value) => {
  if (isIllegalOption(option)) {
    throw illegalOptionError(option);
  }
  if (value === undefined) {
    throw argToOptionError(option);
  }
  if (isIllegalCount(value)) {
    throw illegalCountError(option, value);
  }
};

const getOptions = function (args) {
  const options = { option: '-n', value: 10 };
  let index = 0;

  while (isOption(args[index])) {
    const option = args[index];
    const value = args[index + 1];

    validateOption(option, value);

    options.option = option;
    options.value = +value;

    index = index + 2;
  }
  return [options, index];
};

const combinationError = () => {
  return {
    message: 'head: can\'t combine line and byte counts'
  };
};

const noFileError = () => {
  return {
    message: 'usage: head[-n lines | -c bytes][file ...]'
  };
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
