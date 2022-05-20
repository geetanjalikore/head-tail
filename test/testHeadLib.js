const assert = require('assert');
const { firstLines } = require('../src/headLib.js');

describe('head', () => {
  it('Should give first line when only 1 line is provided', () => {
    assert.deepStrictEqual(firstLines(['hello']), ['hello']);
    assert.deepStrictEqual(firstLines(['bye']), ['bye']);
  });
  it('Should give two lines when only 2 lines are provided', () => {
    assert.deepStrictEqual(firstLines(['hello'], ['bye']), ['hello'], ['bye']);
    assert.deepStrictEqual(firstLines(['bye'], ['hello']), ['bye'], ['hello']);
  });
  it('Should give only first 10 lines for multiple lines', () => {
    const content = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
    const expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    assert.deepStrictEqual(firstLines(content), expected);
  });
});
