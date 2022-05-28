const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadFile = (fileContents) => {
  let index = 0;
  return (fileName, encoding) => {
    assert.deepStrictEqual(fileName, Object.keys(fileContents)[index]);
    index++;
    assert.strictEqual(encoding, 'utf8');
    return fileContents[fileName];
  };
};

const mockConsole = function (expected) {
  let count = 0;
  return {
    log: (actual) => {
      assert.strictEqual(actual, expected[count]);
      count += 1;
    },
    error: (actual) => {
      assert.strictEqual(actual, expected[count]);
      count += 1;
    }
  };
};

describe('headMain', () => {
  it('Should give first line without any option provided', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, error } = mockConsole(['hello']);
    assert.strictEqual(headMain(readFile, { log, error }, 'abc.txt'), 0);
  });

  it('Should give first 10 lines default when more lines are provided', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    const readFile = mockReadFile({ 'abc.txt': content });
    const { log, error } = mockConsole([expected]);
    assert.strictEqual(headMain(readFile, { log, error }, 'abc.txt'), 0);
  });

  it('Should give first 6 lines with count option', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf';
    const readFile = mockReadFile({ 'abc.txt': content });
    const { log, error } = mockConsole([expected]);
    const args = [readFile, { log, error }, '-n', '6', 'abc.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should give first 1 byte ', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, error } = mockConsole(['h']);
    const args = [readFile, { log, error }, '-c', '1', 'abc.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should give first line of two files', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello', 'xyz.txt': 'bye' });
    const file1 = '==> abc.txt <==\nhello\n';
    const file2 = '==> xyz.txt <==\nbye\n';
    const { log, error } = mockConsole([file1, file2]);
    const args = [readFile, { log, error }, 'abc.txt', 'xyz.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should give first 2 lines of two files with -n option', () => {
    const files = { 'abc.txt': 'hello\nbye', 'xyz.txt': 'bye\nhello' };
    const readFile = mockReadFile(files);
    const file1 = '==> abc.txt <==\nhello\nbye\n';
    const file2 = '==> xyz.txt <==\nbye\nhello\n';
    const { log, error } = mockConsole([file1, file2]);
    const args = [readFile, { log, error }, '-n', '2', 'abc.txt', 'xyz.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should give first 2 bytes of two files with -c option', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello', 'xyz.txt': 'bye' });
    const file1 = '==> abc.txt <==\nhe\n';
    const file2 = '==> xyz.txt <==\nby\n';
    const { log, error } = mockConsole([file1, file2]);
    const args = [readFile, { log, error }, '-c', '2', 'abc.txt', 'xyz.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should throw an error if unreadble file is provided', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const expected = 'head: xyz.txt: No such file or directory';
    const { log, error } = mockConsole([expected]);
    assert.strictEqual(headMain(readFile, { log, error }, 'xyz.txt'), 1);
  });

  it('Should throw an error if -n and -c options are combined', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const expected = { message: 'head: can\'t combine line and byte counts' };
    const { log, error } = mockConsole([expected]);
    const args = [readFile, { log, error }, '-n', '1', '-c', '1', 'abc.txt'];
    assert.throws(() => headMain(...args), expected);
  });

  it('Should show usage when no file is provided', () => {
    const expected = { message: 'usage: head[-n lines | -c bytes][file ...]' };
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, error } = mockConsole([expected]);
    assert.throws(() => headMain(readFile, { log, error }), expected);
  });

  it('Should throw error when illegal option is provided', () => {
    const expected = {
      message:
        'head: illegal option -- -k\nusage: head[-n lines | -c bytes][file ...]'
    };
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, error } = mockConsole([expected]);
    const args = [readFile, { log, error }, '-k', '1', 'abc.txt'];
    assert.throws(() => headMain(...args), expected);
  });

  it('Should work for -n option provided without space', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, error } = mockConsole(['hello']);
    const args = [readFile, { log, error }, '-n1', 'abc.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should work for -c option provided without space', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, error } = mockConsole(['h']);
    assert.strictEqual(headMain(readFile, { log, error }, '-c1', 'abc.txt'), 0);
  });

  it('Should work for options with and without space', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne';
    const readFile = mockReadFile({ 'abc.txt': content });
    const { log, error } = mockConsole([expected]);
    const args = [readFile, { log, error }, '-n', '1', '-n5', 'abc.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should give first line with numeric option', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, error } = mockConsole(['hello']);
    assert.strictEqual(headMain(readFile, { log, error }, '-1', 'abc.txt'), 0);
  });

  it('Should give first 5 lines with numeric option', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne';
    const readFile = mockReadFile({ 'abc.txt': content });
    const { log, error } = mockConsole([expected]);
    assert.strictEqual(headMain(readFile, { log, error }, '-5', 'abc.txt'), 0);
  });
});
