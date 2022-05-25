const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe('tail', () => {
  it('Should give last line when only one line is provided', () => {
    assert.strictEqual(tail('hello'), 'hello');
    assert.strictEqual(tail('bye'), 'bye');
  });
  it('Should give two lines when only two lines are provided', () => {
    assert.strictEqual(tail('hello\nbye'), 'hello\nbye');
    assert.strictEqual(tail('bye\nhello'), 'bye\nhello');
  });
  it('Should give last 10 lines when mulitple lines are provided', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'b\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    assert.strictEqual(tail(content), expected);
  });
});
