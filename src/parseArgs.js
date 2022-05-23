/* eslint-disable max-statements */
/* eslint-disable complexity */
const isByte = (option) => '-c' === option;

const isCount = (option) => '-n' === option;

const isIllegalOption = (option) => {
  const regEx = /-[^nc]/;
  return regEx.test(option);
};

const splitArgs = (params) => {
  const args = [];
  const regEx = /^-[nc].+$/;
  let index = 0;

  while (index < params.length) {
    if (regEx.test(params[index])) {
      args.push(params[index].substring(0, 2));
      args.push(params[index].substring(2));
    } else {
      args.push(params[index]);
    }
    index = index + 1;
  }
  return args;
};

const getOptions = function (args) {
  const options = { option: '-n', value: 10 };
  let index = 0;

  while (isByte(args[index]) || isCount(args[index])) {
    options.option = args[index];
    const value = args[index + 1];

    if (!value) {
      throw {
        message: `head: option requires an argument -- ${options.option}\n` +
          'usage: head[-n lines | -c bytes][file ...]'
      };
    }

    if (!isFinite(value)) {
      const type = options.option === '-c' ? 'byte' : 'line';
      throw { message: `head: illegal ${type} count -- ${value}` };
    }

    options.value = +value;
    index = index + 2;
  }
  return [options, index];
};

const parseArgs = (params) => {
  if (params.some(isIllegalOption)) {
    throw {
      message:
        'head: illegal option --\nusage: head[-n lines | -c bytes][file ...]'
    };
  }

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
