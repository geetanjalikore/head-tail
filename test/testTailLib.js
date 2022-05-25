const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe('tail', () => {
  it('Should give last line when only one line is provided', () => {
    const options = { option: '-n', count: 10 };
    assert.strictEqual(tail('hello', options), 'hello');
    assert.strictEqual(tail('bye', options), 'bye');
  });

  it('Should give two lines when only two lines are provided', () => {
    const options = { option: '-n', count: 10 };
    assert.strictEqual(tail('hello\nbye', options), 'hello\nbye');
    assert.strictEqual(tail('bye\nhello', options), 'bye\nhello');
  });

  it('Should give last 10 lines when mulitple lines are provided', () => {
    const options = { option: '-n', count: 10 };
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expected = 'b\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    assert.strictEqual(tail(content, options), expected);
  });

  it('Should give last 1 line when mulitple lines are provided', () => {
    assert.strictEqual(tail('hello\nbye', { option: '-n', count: 1 }), 'bye');
  });

  it('Should give last 3 lines when mulitple lines are provided', () => {
    const content = 'hello\nbye\nhi\ngreet';
    const options = { option: '-n', count: 3 };
    assert.strictEqual(tail(content, options), 'bye\nhi\ngreet');
  });

  it('Should give last 1 byte when only one byte is provided', () => {
    const options = { option: '-c', count: 1 };
    assert.strictEqual(tail('a', options), 'a');
  });

  it('Should give last 2 bytes when only two bytes are provided', () => {
    const options = { option: '-c', count: 2 };
    assert.strictEqual(tail('by', options), 'by');
  });

  it('Should give last 5 bytes when multiple bytes are provided', () => {
    const options = { option: '-c', count: 5 };
    assert.strictEqual(tail('bye\nhello\nhi', options), 'lo\nhi');
  });
});
