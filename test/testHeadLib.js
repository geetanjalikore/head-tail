const assert = require('assert');
const { firstLines, head } = require('../src/headLib.js');

describe('firstLines', () => {
  it('Should give first line when only 1 line is provided', () => {
    assert.deepStrictEqual(firstLines(['hello'], 10), ['hello']);
    assert.deepStrictEqual(firstLines(['bye'], 10), ['bye']);
  });
  it('Should give two lines when only 2 lines are provided', () => {
    assert.deepStrictEqual(firstLines(['hello', 'bye'], 10), ['hello', 'bye']);
    assert.deepStrictEqual(firstLines(['bye', 'hello'], 10), ['bye', 'hello']);
  });
  it('Should give only first 10 lines for multiple lines', () => {
    const content = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
    const expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    assert.deepStrictEqual(firstLines(content, 10), expected);
  });
  it('Should give only first 6 lines when multiple lines are provided', () => {
    const content = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
    const expected = ['a', 'b', 'c', 'd', 'e', 'f'];
    assert.deepStrictEqual(firstLines(content, 6), expected);
  });
});

describe('head', () => {
  it('Should give first line when only 1 line is provided', () => {
    assert.strictEqual(head('hello', { numOfLines: 10 }), 'hello');
    assert.strictEqual(head('bye', { numOfLines: 10 }), 'bye');
  });
  it('Should give two lines when only 2 lines are provided', () => {
    assert.strictEqual(head('hello\nbye', { numOfLines: 10 }), 'hello\nbye');
    assert.strictEqual(head('bye\nhello', { numOfLines: 10 }), 'bye\nhello');
  });
  it('Should give only first 10 lines for multiple lines', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.strictEqual(head(content, { numOfLines: 10 }), expected);
  });
  it('Should give only first 6 lines when multiple lines are provided', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf';
    assert.strictEqual(head(content, { numOfLines: 6 }), expected);
  });
  it('Should give only first byte', () => {
    assert.strictEqual(head('hello', { bytes: 1 }), 'h');
  });
});

