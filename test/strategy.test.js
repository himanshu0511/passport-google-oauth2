/* global describe, it, expect */

const chai = require('chai');
const GoogleStrategy = require('../lib/strategy');


describe('Strategy', () => {
  describe('constructed', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {}));

    it('should be named google', () => {
      expect(strategy.name).to.equal('google');
    });
  });

  describe('constructed with undefined options', () => {
    it('should throw', () => {
      expect(() => {
        GoogleStrategy(undefined, (() => {}));
      }).to.throw(Error);
    });
  });

  describe('authorization request with documented parameters', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {}));


    let url;

    before((done) => {
      chai.passport.use(strategy)
        .redirect((u) => {
          url = u;
          done();
        })
        .req((req) => {
          req.session = {};
        })
        .authenticate({ prompt: 'select_account', loginHint: 'john@mail.com', accessType: 'offline' });
    });

    it('should be redirected', () => {
      expect(url).to.equal('https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=select_account&login_hint=john%40mail.com&response_type=code&client_id=ABC123');
    });
  }); // authorization request with documented parameters

  describe('authorization request with documented parameters from OpenID Connect', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {}));


    let url;

    before((done) => {
      chai.passport.use(strategy)
        .redirect((u) => {
          url = u;
          done();
        })
        .req((req) => {
          req.session = {};
        })
        .authenticate({ display: 'touch' });
    });

    it('should be redirected', () => {
      expect(url).to.equal('https://accounts.google.com/o/oauth2/v2/auth?display=touch&response_type=code&client_id=ABC123');
    });
  }); // authorization request with documented parameters from OpenID Connect

  describe('authorization request with incremental authorization parameters', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {}));


    let url;

    before((done) => {
      chai.passport.use(strategy)
        .redirect((u) => {
          url = u;
          done();
        })
        .req((req) => {
          req.session = {};
        })
        .authenticate({ scope: ['https://www.googleapis.com/auth/drive.file'], includeGrantedScopes: true });
    });

    it('should be redirected', () => {
      expect(url).to.equal('https://accounts.google.com/o/oauth2/v2/auth?include_granted_scopes=true&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file&client_id=ABC123');
    });
  }); // authorization request with incremental authorization parameters

  describe('authorization request with Google Apps for Work parameters', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {}));


    let url;

    before((done) => {
      chai.passport.use(strategy)
        .redirect((u) => {
          url = u;
          done();
        })
        .req((req) => {
          req.session = {};
        })
        .authenticate({ hostedDomain: 'mycollege.edu' });
    });

    it('should be redirected', () => {
      expect(url).to.equal('https://accounts.google.com/o/oauth2/v2/auth?hd=mycollege.edu&response_type=code&client_id=ABC123');
    });
  }); // authorization request with Google Apps for Work parameters

  describe('authorization request with Google Apps for Work parameters, in abbreviated form', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {}));


    let url;

    before((done) => {
      chai.passport.use(strategy)
        .redirect((u) => {
          url = u;
          done();
        })
        .req((req) => {
          req.session = {};
        })
        .authenticate({ hd: 'mycollege.edu' });
    });

    it('should be redirected', () => {
      expect(url).to.equal('https://accounts.google.com/o/oauth2/v2/auth?hd=mycollege.edu&response_type=code&client_id=ABC123');
    });
  }); // authorization request with Google Apps for Work parameters, in abbreviated form

  describe('authorization request with Google parameters', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {}));


    let url;

    before((done) => {
      chai.passport.use(strategy)
        .redirect((u) => {
          url = u;
          done();
        })
        .req((req) => {
          req.session = {};
        })
        .authenticate({ requestVisibleActions: 'http://schema.org/AddAction http://schema.org/ReviewAction' });
    });

    it('should be redirected', () => {
      expect(url).to.equal('https://accounts.google.com/o/oauth2/v2/auth?request_visible_actions=http%3A%2F%2Fschema.org%2FAddAction%20http%3A%2F%2Fschema.org%2FReviewAction&response_type=code&client_id=ABC123');
    });
  }); // authorization request with Google parameters

  describe('authorization request with OpenID 2.0 migration parameters', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {}));


    let url;

    before((done) => {
      chai.passport.use(strategy)
        .redirect((u) => {
          url = u;
          done();
        })
        .req((req) => {
          req.session = {};
        })
        .authenticate({ openIDRealm: 'http://www.example.com/' });
    });

    it('should be redirected', () => {
      expect(url).to.equal('https://accounts.google.com/o/oauth2/v2/auth?openid.realm=http%3A%2F%2Fwww.example.com%2F&response_type=code&client_id=ABC123');
    });
  }); // authorization request with OpenID 2.0 migration parameters

  describe('authorization request with undocumented parameters', () => {
    const strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {}));


    let url;

    before((done) => {
      chai.passport.use(strategy)
        .redirect((u) => {
          url = u;
          done();
        })
        .req((req) => {
          req.session = {};
        })
        .authenticate({ approvalPrompt: 'force', userID: 'bob@gmail.com' });
    });

    it('should be redirected', () => {
      expect(url).to.equal('https://accounts.google.com/o/oauth2/v2/auth?approval_prompt=force&user_id=bob%40gmail.com&response_type=code&client_id=ABC123');
    });
  }); // authorization request with undocumented parameters
});
