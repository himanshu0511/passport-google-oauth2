/* global describe, it, before, expect */
/* eslint-disable no-unused-expressions, consistent-return */

const GoogleStrategy = require('../lib/strategy');
const UserInfoError = require('../lib/errors/userinfoerror');


describe('Strategy#userProfile', () => {
  describe('fetched from OpenID Connect user info endpoint', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      if (url !== 'https://www.googleapis.com/oauth2/v3/userinfo') { return callback(new Error('incorrect url argument')); }
      if (accessToken !== 'token') { return callback(new Error('incorrect token argument')); }

      const body = '{\n "sub": "111111111111111111111",\n "name": "First Last",\n "given_name": "First",\n "family_name": "Last",\n "picture": "https://lh3.googleusercontent.com/-AAAAAAAAAAA/AAAAAAAAAAA/AAAAAAAAAAA/AAAAAAAAAAA/photo.jpg",\n "email": "example@gmail.com",\n "email_verified": true,\n "locale": "en"\n}\n';
      callback(null, body, undefined);
    };


    let profile;

    before((done) => {
      strategy.userProfile('token', (err, p) => {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.provider).to.equal('google');

      expect(profile.id).to.equal('111111111111111111111');
      expect(profile.displayName).to.equal('First Last');
      expect(profile.name.familyName).to.equal('Last');
      expect(profile.name.givenName).to.equal('First');
      expect(profile.emails[0].value).to.equal('example@gmail.com');
      expect(profile.emails[0].verified).to.equal(true);
      expect(profile.photos[0].value).to.equal('https://lh3.googleusercontent.com/-AAAAAAAAAAA/AAAAAAAAAAA/AAAAAAAAAAA/AAAAAAAAAAA/photo.jpg');
    });

    it('should set raw property', () => {
      expect(profile._raw).to.be.a('string');
    });

    it('should set json property', () => {
      expect(profile._json).to.be.an('object');
    });
  });

  describe('error caused by invalid token when using user info endpoint', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      if (url !== 'https://www.googleapis.com/oauth2/v3/userinfo') { return callback(new Error('incorrect url argument')); }

      const body = '{\n "error": "invalid_request",\n "error_description": "Invalid Credentials"\n}\n';
      callback({ statusCode: 401, data: body });
    };

    let err;

    before((done) => {
      strategy.userProfile('invalid-token', (e) => {
        err = e;
        done();
      });
    });

    it('should error', () => {
      expect(err).to.be.an.instanceOf(UserInfoError);
      expect(err.constructor.name).to.equal('UserInfoError');
      expect(err.message).to.equal('Invalid Credentials');
      expect(err.code).to.equal('invalid_request');
    });
  }); // error caused by invalid token when using user info endpoint

  describe('error caused by malformed response', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      const body = 'Hello, world.';
      callback(null, body, undefined);
    };


    let err;

    before((done) => {
      strategy.userProfile('token', (e) => {
        err = e;
        done();
      });
    });

    it('should error', () => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('Failed to parse user profile');
    });
  }); // error caused by malformed response

  describe('internal error', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {}));

    strategy._oauth2.get = function get(url, accessToken, callback) {
      return callback(new Error('something went wrong'));
    };


    let err; let
      profile;

    before((done) => {
      strategy.userProfile('token', (e, p) => {
        err = e;
        profile = p;
        done();
      });
    });

    it('should error', () => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('InternalOAuthError');
      expect(err.message).to.equal('Failed to fetch user profile');
      expect(err.oauthError).to.be.an.instanceOf(Error);
      expect(err.oauthError.message).to.equal('something went wrong');
    });

    it('should not load profile', () => {
      expect(profile).to.be.undefined;
    });
  }); // internal error
});
