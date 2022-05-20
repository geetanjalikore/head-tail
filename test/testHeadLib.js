const assert = require('assert');
const { head, firstNLines, firstNBytes } = require('../src/headLib.js');

describe('head', () => {
  it('Should give first line when only 1 line is provided', () => {
    assert.deepStrictEqual(head('hello', { count: 10 }), 'hello');
    assert.deepStrictEqual(head('bye', { count: 10 }), 'bye');
  });
  it('Should give two lines when only 2 lines are provided', () => {
    assert.deepStrictEqual(head('hello\nbye', { count: 10 }), 'hello\nbye');
    assert.deepStrictEqual(head('bye\nhello', { count: 10 }), 'bye\nhello');
  });
  it('Should give only first 10 lines for multiple lines', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.deepStrictEqual(head(content, { count: 10 }), expected);
  });
  it('Should give only first 6 lines when multiple lines are provided', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf';
    assert.deepStrictEqual(head(content, { count: 6 }), expected);
  });
  it('Should give only first byte', () => {
    assert.strictEqual(head('hello', { bytes: 1 }), 'h');
    assert.strictEqual(head('bye', { bytes: 1 }), 'b');
  });
  it('Should give first 2 bytes from multiple bytes', () => {
    assert.strictEqual(head('hello', { bytes: 2 }), 'he');
    assert.strictEqual(head('bye', { bytes: 2 }), 'by');
  });
  it('Should give first 6 bytes from multiple bytes', () => {
    assert.strictEqual(head('bye\nhello', { bytes: 6 }), 'bye\nhe');
  });
});

describe('firstLines', () => {
  it('Should give first line when only 1 line is provided', () => {
    assert.deepStrictEqual(firstNLines('hello', 10), 'hello');
    assert.deepStrictEqual(firstNLines('bye', 10), 'bye');
  });
  it('Should give two lines when only 2 lines are provided', () => {
    assert.deepStrictEqual(firstNLines('hello\nbye', 10), 'hello\nbye');
    assert.deepStrictEqual(firstNLines('bye\nhello', 10), 'bye\nhello');
  });
  it('Should give only first 10 lines for multiple lines', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.deepStrictEqual(firstNLines(content, 10), expected);
  });
  it('Should give only first 6 lines when multiple lines are provided', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf';
    assert.deepStrictEqual(firstNLines(content, 6), expected);
  });
});

describe('firstNBytes', () => {
  it('Should give first byte when only 1 byte is provided', () => {
    assert.deepStrictEqual(firstNBytes('h', 1), 'h');
    assert.deepStrictEqual(firstNBytes('a', 1), 'a');
  });
  it('Should give two bytes when multiple bytes are provided', () => {
    assert.deepStrictEqual(firstNBytes('hello', 2), 'he');
    assert.deepStrictEqual(firstNBytes('bye', 2), 'by');
  });
  it('Should first 6 character including \\n', () => {
    assert.deepStrictEqual(firstNBytes('hello\nbye', 6), 'hello\n');
    assert.deepStrictEqual(firstNBytes('bye\nhello', 6), 'bye\nhe');
  });
});
