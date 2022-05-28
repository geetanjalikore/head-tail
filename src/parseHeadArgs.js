const isIllegalOption = (option) => {
  return !(option.startsWith('-n') || option.startsWith('-c'));
};

const isOption = (arg) => /^-/.test(arg);

const splitOption = (arg) => {
  if (isFinite(arg)) {
    return ['-n', Math.abs(arg)];
  }
  const option = arg.slice(0, 2);
  const count = arg.slice(2);
  return [option, count];
};

const splitArgs = (cmdArgs) => {
  return cmdArgs.flatMap((arg) => {
    if (isOption(arg)) {
      const [option, count] = splitOption(arg);
      return count ? [option, count] : option;
    }
    return arg;
  });
};

const usage = () => 'usage: head[-n lines | -c bytes][file ...]';

const illegalOptionError = (option) => {
  return { message: `head: illegal option -- ${option}\n` + usage() };
};

const countRequiredError = (option) => {
  return {
    message: `head: option requires an argument -- ${option}\n` + usage()
  };
};

const combinationError = () => {
  return { message: 'head: can\'t combine line and byte counts' };
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
    throw countRequiredError(option);
  }
  if (isIllegalCount(count)) {
    throw illegalCountError(option, count);
  }
};

const segregateArgs = (args) => {
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
  return { options, fileNames: args.slice(index) };
};

const validateCombinedOptions = (args) => {
  if (args.includes('-n') && args.includes('-c')) {
    throw combinationError();
  }
};

const validateFiles = (fileNames) => {
  if (fileNames.length < 1) {
    throw { message: usage() };
  }
};

const parseArgs = (cmdArgs) => {
  const args = splitArgs(cmdArgs);
  validateCombinedOptions(args);

  const { options, fileNames } = segregateArgs(args);
  validateFiles(fileNames);

  return [fileNames, options];
};

exports.parseArgs = parseArgs;
exports.splitOption = splitOption;
exports.splitArgs = splitArgs;
exports.segregateArgs = segregateArgs;
