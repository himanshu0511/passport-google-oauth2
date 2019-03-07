# Passport strategy for Google OAuth 2.0

[![NPM version](https://img.shields.io/npm/v/@passport-next/passport-google-oauth2.svg)](https://www.npmjs.com/package/@passport-next/passport-google-oauth2)
[![Build Status](https://travis-ci.org/passport-next/passport-google-oauth2.svg?branch=master)](https://travis-ci.org/passport-next/passport-google-oauth2)
[![Coverage Status](https://coveralls.io/repos/github/passport-next/passport-google-oauth2/badge.svg?branch=master)](https://coveralls.io/github/passport-next/passport-google-oauth2?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/7c817d8118420a47390a/maintainability)](https://codeclimate.com/github/passport-next/passport-google-oauth2/maintainability)
[![Dependencies](https://david-dm.org/passport-next/passport-google-oauth2.png)](https://david-dm.org/passport-next/passport-google-oauth2)
<!--[![SAST](https://gitlab.com/passport-next/passport-google-oauth2/badges/master/build.svg)](https://gitlab.com/passport-next/passport-google-oauth2/badges/master/build.svg)-->

## Install

```bash
$ npm install @passport-next/passport-google-oauth2
```

## Usage

#### Create an Application

Before using `@passport-next/passport-google-oauth2`, you must register an application with
Google.  If you have not already done so, a new project can be created in the
[Google Developers Console](https://console.developers.google.com/).
Your application will be issued a client ID and client secret, which need to be
provided to the strategy.  You will also need to configure a redirect URI which
matches the route in your application.

#### Configure Strategy

The Google authentication strategy authenticates users using a Google account
and OAuth 2.0 tokens.  The client ID and secret obtained when creating an
application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
Google profile.  The `verify` callback must call `cb` providing a user to
complete authentication.

```javascript
var GoogleStrategy = require('@passport-next/passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'google'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  ```
## Examples

Developers using the popular [Express](http://expressjs.com/) web framework can
refer to an [example](https://github.com/passport/express-4.x-facebook-example)
as a starting point for their own web applications.  The example shows how to
authenticate users using Facebook.  However, because both Facebook and Google
use OAuth 2.0, the code is similar.  Simply replace references to Facebook with
corresponding references to Google.
