const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('should give first line when only 1 line is provided', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });
  it('should give two lines when only 2 lines are provided', () => {
    assert.strictEqual(head('hello\nbye'), 'hello\nbye');
    assert.strictEqual(head('bye\nhello'), 'bye\nhello');
  });
  it('Should give only first 10 lines for multiple lines', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.strictEqual(head(content), expected);
  });
});
