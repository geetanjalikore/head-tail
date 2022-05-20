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
});

describe('head', () => {
  it('Should give first line when only 1 line is provided', () => {
    assert.deepStrictEqual(head('hello'), 'hello');
    assert.deepStrictEqual(head('bye'), 'bye');
  });
  it('Should give two lines when only 2 lines are provided', () => {
    assert.deepStrictEqual(head('hello\nbye'), 'hello\nbye');
    assert.deepStrictEqual(head('bye\nhello'), 'bye\nhello');
  });
  it('Should give only first 10 lines for multiple lines', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.deepStrictEqual(head(content), expected);
  });
});
