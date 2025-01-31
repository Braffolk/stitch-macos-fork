import { expect } from 'chai';
import { assertThrows } from './assert.js';
import { debugOnError, setValueAtPointer } from './util.js';

describe('Utilities', function () {
  it('can get debugOnFail results when there is no error', function () {
    expect(debugOnError(() => 10)).to.equal(10);
  });

  it('can set values using a pointer', function () {
    let data = {};
    setValueAtPointer(data, ['a', 'b', 'c'], 'd');
    expect(data).to.deep.equal({ a: { b: { c: 'd' } } });

    assertThrows(
      () => setValueAtPointer(data, ['a', 'b', 'c', 'd'], 'e'),
      'Cannot set value at pointer ["a","b","c","d"] because ["a","b","c"] is not an object',
    );
  });
});
