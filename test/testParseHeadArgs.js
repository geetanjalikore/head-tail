const assert = require('assert');
const lib = require('../src/parseHeadArgs.js');
const { parseArgs, splitOption, splitArgs, getOptions } = lib;

describe('splitOption', () => {
  it('Should split the option and count', () => {
    assert.deepStrictEqual(splitOption('-n1'), ['-n', '1']);
    assert.deepStrictEqual(splitOption('-c1'), ['-c', '1']);
  });
  it('Should split numeric option', () => {
    assert.deepStrictEqual(splitOption('-1'), ['-n', 1]);
    assert.deepStrictEqual(splitOption('-10'), ['-n', 10]);
  });
});

describe('splitArgs', () => {
  it('Should split the arguments into option and count', () => {
    assert.deepStrictEqual(splitArgs(['-n1']), ['-n', '1']);
    assert.deepStrictEqual(splitArgs(['-c1']), ['-c', '1']);
  });
  it('Should split the arguments with spaces', () => {
    const expected = ['-n', '1', '-c', '3'];
    assert.deepStrictEqual(splitArgs(['-n', '1', '-c3']), expected);
  });
});

describe('getOptions', () => {
  it('Should give options', () => {
    const expected = { option: '-n', count: 1 };
    assert.deepStrictEqual(getOptions(['-n', '1']), expected);
  });
  it('Should give last option when multiple options are provided', () => {
    const expected = { option: '-c', count: 4 };
    assert.deepStrictEqual(getOptions(['-c', '6', '-c', '4']), expected);
  });
});

describe('parseArgs', () => {
  it('Should parse the fileName', () => {
    let expected = [['abc.txt'], { option: '-n', count: 10 }];
    assert.deepStrictEqual(parseArgs(['abc.txt']), expected);

    expected = [['xyz.txt'], { option: '-n', count: 10 }];
    assert.deepStrictEqual(parseArgs(['xyz.txt']), expected);
  });

  it('Should parse the fileName and count', () => {
    let expected = [['abc.txt'], { option: '-n', count: 1 }];
    assert.deepStrictEqual(parseArgs(['-n', '1', 'abc.txt']), expected);

    expected = [['xyz.txt'], { option: '-n', count: 1 }];
    assert.deepStrictEqual(parseArgs(['-n', '1', 'xyz.txt']), expected);
  });

  it('Should parse the fileName and bytes', () => {
    const expected = [['abc.txt'], { option: '-c', count: 1, }];
    assert.deepStrictEqual(parseArgs(['-c', '1', 'abc.txt']), expected);
  });

  it('Should parse the fileName and multiple count options', () => {
    const args = ['-n', '1', '-n', '6', 'abc.txt'];
    const expected = [['abc.txt'], { option: '-n', count: 6 }];
    assert.deepStrictEqual(parseArgs(args), expected);
  });

  it('Should parse the fileName and multiple bytes options', () => {
    const args = ['-c', '1', '-c', '6', 'abc.txt'];
    const expected = [['abc.txt'], { option: '-c', count: 6 }];
    assert.deepStrictEqual(parseArgs(args), expected);
  });

  it('Should throw error when two options are combined', () => {
    const expected = { message: 'head: can\'t combine line and byte counts' };
    assert.throws(() => parseArgs(['-n', '1', '-c', '1', 'abc.txt']), expected);
    assert.throws(() => parseArgs(['-n', '1', '-c1', 'abc.txt']), expected);
  });

  it('Should parse two files', () => {
    const args = ['abc.txt', 'xyz.txt'];
    const expected = [['abc.txt', 'xyz.txt'], { option: '-n', count: 10 }];
    assert.deepStrictEqual(parseArgs(args), expected);
  });

  it('Should parse two files with -n option', () => {
    const args = ['-n', '1', 'abc.txt', 'xyz.txt'];
    const expected = [['abc.txt', 'xyz.txt'], { option: '-n', count: 1 }];
    assert.deepStrictEqual(parseArgs(args), expected);
  });

  it('Should parse two files with -c option', () => {
    const args = ['-c', '1', 'abc.txt', 'xyz.txt'];
    const expected = [['abc.txt', 'xyz.txt'], { option: '-c', count: 1 }];
    assert.deepStrictEqual(parseArgs(args), expected);
  });

  it('Should throw error when illegal option is provided', () => {
    const expected = {
      message:
        'head: illegal option -- -k\nusage: head[-n lines | -c bytes][file ...]'
    };
    assert.throws(() => parseArgs(['-k', '1', 'abc.txt']), expected);
  });

  it('Should throw an error if count is not provided with option', () => {
    let expected = { message: 'head: option requires an argument -- -c\nusage: head[-n lines | -c bytes][file ...]' };
    assert.throws(() => parseArgs(['-c']), expected);

    expected = { message: 'head: option requires an argument -- -n\nusage: head[-n lines | -c bytes][file ...]' };
    assert.throws(() => parseArgs(['-n']), expected);
  });

  it('Should throw an error if count of options is not numeric', () => {
    let expected = { message: 'head: illegal byte count -- f' };
    assert.throws(() => parseArgs(['-cf']), expected);

    expected = { message: 'head: illegal line count -- f' };
    assert.throws(() => parseArgs(['-nf']), expected);
  });

  it('Should parse option and count without space', () => {
    let expected = [['abc.txt'], { option: '-n', count: 1 }];
    assert.deepStrictEqual(parseArgs(['-n1', 'abc.txt']), expected);

    expected = [['abc.txt'], { option: '-c', count: 1 }];
    assert.deepStrictEqual(parseArgs(['-c1', 'abc.txt']), expected);
  });

  it('Should parse multiple options without space', () => {
    let expected = [['abc.txt'], { option: '-n', count: 6 }];
    assert.deepStrictEqual(parseArgs(['-n1', '-n6', 'abc.txt']), expected);

    expected = [['abc.txt'], { option: '-c', count: 6 }];
    assert.deepStrictEqual(parseArgs(['-c1', '-c6', 'abc.txt']), expected);
  });

  it('Should parse multiple options with and without space', () => {
    let expected = [['abc.txt'], { option: '-n', count: 6 }];
    assert.deepStrictEqual(parseArgs(['-n', '1', '-n6', 'abc.txt']), expected);

    expected = [['abc.txt'], { option: '-n', count: 1 }];
    assert.deepStrictEqual(parseArgs(['-n6', '-n', 1, 'abc.txt']), expected);

    expected = [['abc.txt'], { option: '-c', count: 1 }];
    assert.deepStrictEqual(parseArgs(['-c', '6', '-c1', 'abc.txt']), expected);
  });

  it('should throw error when option count is less than 1', () => {
    const expected = { message: 'head: illegal line count -- 0' };
    assert.throws(() => parseArgs(['-n', '0', 'abc.txt']), expected);
  });

  it('Should work for numeric option', () => {
    let expected = [['abc.txt'], { option: '-n', count: 1 }];
    assert.deepStrictEqual(parseArgs(['-1', 'abc.txt']), expected);

    expected = [['abc.txt'], { option: '-n', count: 2 }];
    assert.deepStrictEqual(parseArgs(['-2', 'abc.txt']), expected);
  });
});
