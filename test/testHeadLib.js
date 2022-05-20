const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('should give first line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });
  it('should give two lines ', () => {
    assert.strictEqual(head('hello\nbye'), 'hello\nbye');
    assert.strictEqual(head('bye\nhello'), 'bye\nhello');
  });
});
