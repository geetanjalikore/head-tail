const assert = require('assert');
const lib = require('../src/headLib.js');
const { head, firstNLines, firstNBytes, headMain } = lib;

describe('head', () => {
  it('Should give first line when only 1 line is provided', () => {
    assert.strictEqual(head('hello', { option: '-n', value: 10 }), 'hello');
    assert.strictEqual(head('bye', { option: '-n', value: 10 }), 'bye');
  });

  it('Should give two lines when only 2 lines are provided', () => {
    const options = { option: '-n', value: 10 };
    assert.strictEqual(head('hello\nbye', options), 'hello\nbye');
    assert.strictEqual(head('bye\nhello', options), 'bye\nhello');
  });

  it('Should give only first 10 lines', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.strictEqual(head(content, { option: '-n', value: 10 }), expected);
  });

  it('Should give only first 6 lines when multiple lines are provided', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf';
    assert.strictEqual(head(content, { option: '-n', value: 6 }), expected);
  });

  it('Should give only first byte', () => {
    const options = { option: '-c', value: 1 };
    assert.strictEqual(head('hello', options), 'h');
    assert.strictEqual(head('bye', options), 'b');
  });

  it('Should give first 2 bytes from multiple bytes', () => {
    const options = { option: '-c', value: 2 };
    assert.strictEqual(head('hello', options), 'he');
    assert.strictEqual(head('bye', options), 'by');
  });
});

describe('firstNLines', () => {
  it('Should give first line when only 1 line is provided', () => {
    assert.strictEqual(firstNLines('hello', 10), 'hello');
    assert.strictEqual(firstNLines('bye', 10), 'bye');
  });

  it('Should give two lines when only 2 lines are provided', () => {
    assert.strictEqual(firstNLines('hello\nbye', 10), 'hello\nbye');
    assert.strictEqual(firstNLines('bye\nhello', 10), 'bye\nhello');
  });

  it('Should give only first 10 lines for multiple lines', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.strictEqual(firstNLines(content, 10), expected);
  });

  it('Should give only first 6 lines when multiple lines are provided', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf';
    assert.strictEqual(firstNLines(content, 6), expected);
  });
});

describe('firstNBytes', () => {
  it('Should give first byte when only 1 byte is provided', () => {
    assert.strictEqual(firstNBytes('h', 1), 'h');
    assert.strictEqual(firstNBytes('a', 1), 'a');
  });

  it('Should give two bytes when multiple bytes are provided', () => {
    assert.strictEqual(firstNBytes('hello', 2), 'he');
    assert.strictEqual(firstNBytes('bye', 2), 'by');
  });
});

const fileNotFoundError = (file) => {
  return { message: `${file} not found` };
};

const mockReadFile = (fileContents) => {
  return (fileName, encoding) => {
    if (!Object.keys(fileContents).includes(fileName)) {
      throw fileNotFoundError(fileName);
    }
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
      return actual;
    },
    err: (actual) => {
      assert.strictEqual(actual, expected[count]);
      count += 1;
      return actual;
    }
  };
};

describe('headMain', () => {
  it('Should give first line without any option provided', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, err } = mockConsole(['hello']);
    assert.strictEqual(headMain(readFile, { log, err }, 'abc.txt'), 0);
  });

  it('Should give first 10 lines default when more lines are provided', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    const readFile = mockReadFile({ 'abc.txt': content });
    const { log, err } = mockConsole([expected]);
    assert.strictEqual(headMain(readFile, { log, err }, 'abc.txt'), 0);
  });

  it('Should give first 6 lines with count option', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf';
    const readFile = mockReadFile({ 'abc.txt': content });
    const { log, err } = mockConsole([expected]);
    const args = [readFile, { log, err }, '-n', '6', 'abc.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should give first 1 byte ', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, err } = mockConsole(['h']);
    const args = [readFile, { log, err }, '-c', '1', 'abc.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should give first line of two files', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello', 'xyz.txt': 'bye' });
    const file1 = '==> abc.txt <==\nhello\n';
    const file2 = '==> xyz.txt <==\nbye\n';
    const { log, err } = mockConsole([file1, file2]);
    const args = [readFile, { log, err }, 'abc.txt', 'xyz.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should give first 2 lines of two files with -n option', () => {
    const files = { 'abc.txt': 'hello\nbye', 'xyz.txt': 'bye\nhello' };
    const readFile = mockReadFile(files);
    const file1 = '==> abc.txt <==\nhello\nbye\n';
    const file2 = '==> xyz.txt <==\nbye\nhello\n';
    const { log, err } = mockConsole([file1, file2]);
    const args = [readFile, { log, err }, '-n', '2', 'abc.txt', 'xyz.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should give first 2 bytes of two files with -c option', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello', 'xyz.txt': 'bye' });
    const file1 = '==> abc.txt <==\nhe\n';
    const file2 = '==> xyz.txt <==\nby\n';
    const { log, err } = mockConsole([file1, file2]);
    const args = [readFile, { log, err }, '-c', '2', 'abc.txt', 'xyz.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should throw an error if unreadble file is provided', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const expected = 'xyz.txt not found';
    const { log, err } = mockConsole([expected]);
    assert.strictEqual(headMain(readFile, { log, err }, 'xyz.txt'), 1);
  });

  it('Should throw an error if -n and -c options are combined', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const expected = 'head: can\'t combine line and byte counts';
    const { log, err } = mockConsole([expected]);
    const args = [readFile, { log, err }, '-n', '1', '-c', '1', 'abc.txt'];
    assert.strictEqual(headMain(...args), 1);
  });

  it('Should show usage when no file is provided', () => {
    const expected = 'usage: head[-n lines | -c bytes][file ...]';
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, err } = mockConsole([expected]);
    assert.strictEqual(headMain(readFile, { log, err }), 1);
  });

  it('Should throw error when illegal option is provided', () => {
    const expected = 'head: illegal option -- -k\nusage: head[-n lines | -c bytes][file ...]';
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, err } = mockConsole([expected]);
    const args = [readFile, { log, err }, '-k', '1', 'abc.txt'];
    assert.strictEqual(headMain(...args), 1);
  });

  it('Should work for -n option provided without space', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, err } = mockConsole(['hello']);
    const args = [readFile, { log, err }, '-n1', 'abc.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should work for -c option provided without space', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, err } = mockConsole(['h']);
    assert.strictEqual(headMain(readFile, { log, err }, '-c1', 'abc.txt'), 0);
  });

  it('Should work for options with and without space', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne';
    const readFile = mockReadFile({ 'abc.txt': content });
    const { log, err } = mockConsole([expected]);
    const args = [readFile, { log, err }, '-n', '1', '-n5', 'abc.txt'];
    assert.strictEqual(headMain(...args), 0);
  });

  it('Should give first line with numeric option', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const { log, err } = mockConsole(['hello']);
    assert.strictEqual(headMain(readFile, { log, err }, '-1', 'abc.txt'), 0);
  });

  it('Should give first 5 lines with numeric option', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne';
    const readFile = mockReadFile({ 'abc.txt': content });
    const { log, err } = mockConsole([expected]);
    assert.strictEqual(headMain(readFile, { log, err }, '-5', 'abc.txt'), 0);
  });
});
