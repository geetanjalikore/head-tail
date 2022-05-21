const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should parse the fileName', () => {
    const expected = ['abc.txt', { count: 10, bytes: 0 }];
    assert.deepStrictEqual(parseArgs(['abc.txt']), expected);
  });
  it('Should parse the fileName and count', () => {
    const expected = ['abc.txt', { count: 1, bytes: 0 }];
    assert.deepStrictEqual(parseArgs(['-n', '1', 'abc.txt']), expected);
  });
  it('Should parse the fileName and bytes', () => {
    const expected = ['abc.txt', { count: 10, bytes: 1 }];
    assert.deepStrictEqual(parseArgs(['-c', '1', 'abc.txt']), expected);
  });
  it('Should parse the fileName and multiple count options', () => {
    const args = ['-n', '1', '-n', '6', 'abc.txt'];
    const expected = ['abc.txt', { count: 6, bytes: 0 }];
    assert.deepStrictEqual(parseArgs(args), expected);
  });
  it('Should parse the fileName and multiple bytes options', () => {
    const args = ['-c', '1', '-c', '6', 'abc.txt'];
    const expected = ['abc.txt', { count: 10, bytes: 6 }];
    assert.deepStrictEqual(parseArgs(args), expected);
  });
  it('Should throw error when two options are combined', () => {
    const expected = { message: 'head: can\'t combine line and byte counts' };
    assert.throws(() => parseArgs(['-n', 1, '-c', 1]), expected);
  });
});
