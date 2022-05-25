const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe('tail', () => {
  it('Should give last line when only one line is provided', () => {
    assert.strictEqual(tail('hello'), 'hello');
    assert.strictEqual(tail('bye'), 'bye');
  });
});
