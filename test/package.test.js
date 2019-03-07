/* global describe, it, expect */

const strategy = require('..');

describe('passport-google-oauth2', () => {
  it('should export Strategy constructor', () => {
    expect(strategy.Strategy).to.be.a('function');
  });

  it('should export Strategy constructor as module', () => {
    expect(strategy).to.be.a('function');
    expect(strategy).to.equal(strategy.Strategy);
  });
});
