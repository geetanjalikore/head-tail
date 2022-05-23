const isIllegalOption = (option) => {
  const regEx = /-[^nc]/;
  return regEx.test(option);
};

const splitOption = (arg) => {
  const option = arg.substring(0, 2);
  const value = arg.substring(2);
  return [option, value];
};

const splitArgs = (params) => {
  const args = [];
  const regEx = /^-..+$/;
  let index = 0;

  while (index < params.length) {
    if (regEx.test(params[index])) {
      const [option, value] = splitOption(params[index]);
      args.push(option, value);
    } else {
      args.push(params[index]);
    }
    index = index + 1;
  }
  return args;
};

const isOption = (arg) => /^-/.test(arg);

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
  if (!isFinite(value) || value < 1) {
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

const parseArgs = (params) => {
  const args = splitArgs(params);
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
