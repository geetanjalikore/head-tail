const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe('tail', () => {
  it('Should give last line when only one line is provided', () => {
    assert.strictEqual(tail('hello', 10), 'hello');
    assert.strictEqual(tail('bye', 10), 'bye');
  });

  it('Should give two lines when only two lines are provided', () => {
    assert.strictEqual(tail('hello\nbye', 10), 'hello\nbye');
    assert.strictEqual(tail('bye\nhello', 10), 'bye\nhello');
  });

  it('Should give last 10 lines when mulitple lines are provided', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'b\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    assert.strictEqual(tail(content, 10), expected);
  });

  it('Should give last 1 line when mulitple lines are provided', () => {
    assert.strictEqual(tail('hello\nbye', 1), 'bye');
  });

  it('Should give last 3 lines when mulitple lines are provided', () => {
    assert.strictEqual(tail('hello\nbye\nhi\ngreet', 3), 'bye\nhi\ngreet');
  });
});
