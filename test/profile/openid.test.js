/* global describe, it, expect */
/* eslint-disable no-unused-expressions, consistent-return */

const fs = require('fs');
const Profile = require('../../lib/profile/openid');

describe('OpenIDProfile.parse', () => {
  describe('profile with openid scope only', () => {
    let profile;

    before((done) => {
      fs.readFile('test/fixtures/userinfo/userinfo.json', 'utf8', (err, data) => {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        return done();
      });
    });

    it('should parse profile', () => {
      expect(profile.id).to.equal('111111111111111111111');
      expect(profile.displayName).to.equal('');
      expect(profile.name).to.be.undefined;
      expect(profile.emails).to.be.undefined;
      expect(profile.photos).to.have.length(1);
      expect(profile.photos[0].value).to.equal('https://lh3.googleusercontent.com/-XxXXxxXxXXX/AAAAAAAAAAI/AAAAAAAAAAA/0000xxxxx0X/photo.jpg');
    });
  });

  describe('profile with profile scope', () => {
    let profile;

    before((done) => {
      fs.readFile('test/fixtures/userinfo/userinfo-with-profile.json', 'utf8', (err, data) => {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.id).to.equal('111111111111111111111');
      expect(profile.displayName).to.equal('First Last');
      expect(profile.name.familyName).to.equal('Last');
      expect(profile.name.givenName).to.equal('First');
      expect(profile.emails).to.be.undefined;
      expect(profile.photos).to.have.length(1);
      expect(profile.photos[0].value).to.equal('https://lh3.googleusercontent.com/-XxXXxxXxXXX/AAAAAAAAAAI/AAAAAAAAAAA/0000xxxxx0X/photo.jpg');
    });
  });

  describe('profile with profile and email scope', () => {
    let profile;

    before((done) => {
      fs.readFile('test/fixtures/userinfo/userinfo-with-profile-email.json', 'utf8', (err, data) => {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.id).to.equal('111111111111111111111');
      expect(profile.displayName).to.equal('First Last');
      expect(profile.name.familyName).to.equal('Last');
      expect(profile.name.givenName).to.equal('First');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0].value).to.equal('example@gmail.com');
      expect(profile.emails[0].verified).to.equal(true);
      expect(profile.photos).to.have.length(1);
      expect(profile.photos[0].value).to.equal('https://lh3.googleusercontent.com/-XxXXxxXxXXX/AAAAAAAAAAI/AAAAAAAAAAA/0000xxxxx0X/photo.jpg');
    });
  });

  describe('profile with new "id" style', () => {
    let profile;

    before((done) => {
      fs.readFile('test/fixtures/userinfo/userinfo-with-id.json', 'utf8', (err, data) => {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.id).to.equal('111111111111111111112');
    });
  });

  describe('profile with new "verified_email" style', () => {
    let profile;

    before((done) => {
      fs.readFile('test/fixtures/userinfo/userinfo-with-verified-email.json', 'utf8', (err, data) => {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0].value).to.equal('example@gmail.com');
      expect(profile.emails[0].verified).to.equal(true);
    });
  });

  describe('profile without picture attribute', () => {
    let profile;

    before((done) => {
      fs.readFile('test/fixtures/userinfo/userinfo-no-picture.json', 'utf8', (err, data) => {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.id).to.equal('111111111111111111111');
      expect(profile.displayName).to.equal('');
      expect(profile.name).to.be.undefined;
      expect(profile.emails).to.be.undefined;
      expect(profile.photos).to.be.undefined;
    });
  });
});
