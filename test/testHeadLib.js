const assert = require('assert');
const lib = require('../src/headLib.js');
const { head, firstNLines, firstNBytes, headMain } = lib;

describe('head', () => {
  it('Should give first line when only 1 line is provided', () => {
    assert.strictEqual(head('hello', { count: 10 }), 'hello');
    assert.strictEqual(head('bye', { count: 10 }), 'bye');
  });

  it('Should give two lines when only 2 lines are provided', () => {
    assert.strictEqual(head('hello\nbye', { count: 10 }), 'hello\nbye');
    assert.strictEqual(head('bye\nhello', { count: 10 }), 'bye\nhello');
  });

  it('Should give only first 10 lines for multiple lines', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.strictEqual(head(content, { count: 10 }), expected);
  });

  it('Should give only first 6 lines when multiple lines are provided', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf';
    assert.strictEqual(head(content, { count: 6 }), expected);
  });

  it('Should give only first byte', () => {
    assert.strictEqual(head('hello', { bytes: 1 }), 'h');
    assert.strictEqual(head('bye', { bytes: 1 }), 'b');
  });

  it('Should give first 2 bytes from multiple bytes', () => {
    assert.strictEqual(head('hello', { bytes: 2 }), 'he');
    assert.strictEqual(head('bye', { bytes: 2 }), 'by');
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

const mockReadFile = (fileContents) => {
  return (fileName, encoding) => {
    if (!Object.keys(fileContents).includes(fileName)) {
      throw { 'message': `${fileName} not found` };
    }
    assert.equal(encoding, 'utf8');
    return fileContents[fileName];
  };
};

describe('headMain', () => {
  it('Should give first line without any option provided', () => {
    let readFile = mockReadFile({ 'abc.txt': 'hello' });
    assert.strictEqual(headMain(readFile, 'abc.txt'), 'hello');

    readFile = mockReadFile({ 'xyz.txt': 'bye' });
    assert.strictEqual(headMain(readFile, 'xyz.txt'), 'bye');
  });

  it('Should give first 10 lines default when more lines are provided', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    const readFile = mockReadFile({ 'abc.txt': content });
    assert.strictEqual(headMain(readFile, 'abc.txt'), expected);
  });

  it('Should give first 6 lines with count option', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf';
    const readFile = mockReadFile({ 'abc.txt': content });
    assert.strictEqual(headMain(readFile, '-n', 6, 'abc.txt'), expected);
  });

  it('Should give first 1 byte ', () => {
    let readFile = mockReadFile({ 'abc.txt': 'hello' });
    assert.strictEqual(headMain(readFile, '-c', 1, 'abc.txt'), 'h');

    readFile = mockReadFile({ 'abc.txt': 'bye' });
    assert.strictEqual(headMain(readFile, '-c', 1, 'abc.txt'), 'b');
  });

  it('Should give first line of two files', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello', 'xyz.txt': 'bye' });
    assert.strictEqual(headMain(readFile, 'abc.txt', 'xyz.txt'), 'hello\nbye');
  });

  it('Should give first 2 lines of two files with -n option', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello\nbye', 'xyz.txt': 'bye\nhello' });
    const args = [readFile, '-n', 2, 'abc.txt', 'xyz.txt'];
    assert.strictEqual(headMain(...args), 'hello\nbye\nbye\nhello');
  });

  it('Should give first 2 bytes of two files with -c option', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello', 'xyz.txt': 'bye' });
    const args = [readFile, '-c', 2, 'abc.txt', 'xyz.txt'];
    assert.strictEqual(headMain(...args), 'he\nby');
  });

  it('Should throw an error if unreadble file is provided', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const expected = 'xyz.txt not found';
    assert.strictEqual(headMain(readFile, 'xyz.txt'), expected);
  });

  it('Should throw an error if -n and -c options are combined', () => {
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const expected = 'head: can\'t combine line and byte counts';
    const args = [readFile, '-n', 1, '-c', 1, 'abc.txt'];
    assert.strictEqual(headMain(...args), expected);
  });

  it('Should show usage when no file is provided', () => {
    const expected = 'usage: head[-n lines | -c bytes][file ...]';
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    assert.strictEqual(headMain(readFile), expected);
  });

  it('Should throw error when illegal option is provided', () => {
    const expected = 'head: illegal option --k\nusage: head[-n lines | -c bytes][file ...]';
    const readFile = mockReadFile({ 'abc.txt': 'hello' });
    const args = ['-k', 1, 'abc.txt'];
    assert.strictEqual(headMain(readFile, args), expected);
  });
});
