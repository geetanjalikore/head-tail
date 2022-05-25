const assert = require('assert');
const { head, firstNLines, firstNBytes } = require('../src/headLib.js');

describe('head', () => {
  it('Should give first line when only 1 line is provided', () => {
    assert.strictEqual(head('hello', { option: '-n', count: 10 }), 'hello');
    assert.strictEqual(head('bye', { option: '-n', count: 10 }), 'bye');
  });

  it('Should give two lines when only 2 lines are provided', () => {
    const options = { option: '-n', count: 10 };
    assert.strictEqual(head('hello\nbye', options), 'hello\nbye');
    assert.strictEqual(head('bye\nhello', options), 'bye\nhello');
  });

  it('Should give only first 10 lines', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.strictEqual(head(content, { option: '-n', count: 10 }), expected);
  });

  it('Should give only first 6 lines when multiple lines are provided', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf';
    assert.strictEqual(head(content, { option: '-n', count: 6 }), expected);
  });

  it('Should give only first byte', () => {
    const options = { option: '-c', count: 1 };
    assert.strictEqual(head('hello', options), 'h');
    assert.strictEqual(head('bye', options), 'b');
  });

  it('Should give first 2 bytes from multiple bytes', () => {
    const options = { option: '-c', count: 2 };
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
