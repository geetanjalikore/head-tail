const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should parse the fileName', () => {
    let expected = [['abc.txt'], { option: '-n', value: 10 }];
    assert.deepStrictEqual(parseArgs(['abc.txt']), expected);

    expected = [['xyz.txt'], { option: '-n', value: 10 }];
    assert.deepStrictEqual(parseArgs(['xyz.txt']), expected);
  });

  it('Should parse the fileName and count', () => {
    let expected = [['abc.txt'], { option: '-n', value: 1 }];
    assert.deepStrictEqual(parseArgs(['-n', '1', 'abc.txt']), expected);

    expected = [['xyz.txt'], { option: '-n', value: 1 }];
    assert.deepStrictEqual(parseArgs(['-n', '1', 'xyz.txt']), expected);
  });

  it('Should parse the fileName and bytes', () => {
    const expected = [['abc.txt'], { option: '-c', value: 1, }];
    assert.deepStrictEqual(parseArgs(['-c', '1', 'abc.txt']), expected);
  });

  it('Should parse the fileName and multiple count options', () => {
    const args = ['-n', '1', '-n', '6', 'abc.txt'];
    const expected = [['abc.txt'], { option: '-n', value: 6 }];
    assert.deepStrictEqual(parseArgs(args), expected);
  });

  it('Should parse the fileName and multiple bytes options', () => {
    const args = ['-c', '1', '-c', '6', 'abc.txt'];
    const expected = [['abc.txt'], { option: '-c', value: 6 }];
    assert.deepStrictEqual(parseArgs(args), expected);
  });

  it('Should throw error when two options are combined', () => {
    const expected = { message: 'head: can\'t combine line and byte counts' };
    assert.throws(() => parseArgs(['-n', 1, '-c', 1, 'abc.txt']), expected);
    assert.throws(() => parseArgs(['-n', 1, '-c1', 'abc.txt']), expected);
  });

  it('Should parse two files', () => {
    const args = ['abc.txt', 'xyz.txt'];
    const expected = [['abc.txt', 'xyz.txt'], { option: '-n', value: 10 }];
    assert.deepStrictEqual(parseArgs(args), expected);
  });

  it('Should parse two files with -n option', () => {
    const args = ['-n', 1, 'abc.txt', 'xyz.txt'];
    const expected = [['abc.txt', 'xyz.txt'], { option: '-n', value: 1 }];
    assert.deepStrictEqual(parseArgs(args), expected);
  });

  it('Should parse two files with -c option', () => {
    const args = ['-c', 1, 'abc.txt', 'xyz.txt'];
    const expected = [['abc.txt', 'xyz.txt'], { option: '-c', value: 1 }];
    assert.deepStrictEqual(parseArgs(args), expected);
  });

  it('Should throw error when illegal option is provided', () => {
    const expected = {
      message:
        'head: illegal option --\nusage: head[-n lines | -c bytes][file ...]'
    };
    assert.throws(() => parseArgs(['-k', 1, 'abc.txt']), expected);
  });

  it('Should throw an error if value is not provided with -n option', () => {
    const expected = 'head: option requires an argument --n\nusage: head[-n lines | -c bytes][file ...]';
    assert.throws(() => parseArgs(['-n']), expected);
  });

  it('Should throw an error if value is not provided with -c option', () => {
    const expected = 'head: option requires an argument --c\nusage: head[-n lines | -c bytes][file ...]';
    assert.throws(() => parseArgs(['-c']), expected);
  });

  it('Should parse option and value without space', () => {
    let expected = [['abc.txt'], { option: '-n', value: 1 }];
    assert.deepStrictEqual(parseArgs(['-n1', 'abc.txt']), expected);

    expected = [['abc.txt'], { option: '-c', value: 1 }];
    assert.deepStrictEqual(parseArgs(['-c1', 'abc.txt']), expected);
  });

  it('Should parse multiple options without space', () => {
    let expected = [['abc.txt'], { option: '-n', value: 6 }];
    assert.deepStrictEqual(parseArgs(['-n1', '-n6', 'abc.txt']), expected);

    expected = [['abc.txt'], { option: '-c', value: 6 }];
    assert.deepStrictEqual(parseArgs(['-c1', '-c6', 'abc.txt']), expected);
  });

  it('Should parse multiple options with and without space', () => {
    let expected = [['abc.txt'], { option: '-n', value: 6 }];
    assert.deepStrictEqual(parseArgs(['-n', 1, '-n6', 'abc.txt']), expected);

    expected = [['abc.txt'], { option: '-n', value: 1 }];
    assert.deepStrictEqual(parseArgs(['-n', 6, '-n1', 'abc.txt']), expected);

    expected = [['abc.txt'], { option: '-c', value: 1 }];
    assert.deepStrictEqual(parseArgs(['-c', 6, '-c1', 'abc.txt']), expected);
  });
});
