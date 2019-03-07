const chai = require('chai');


const passport = require('@passport-next/chai-passport-strategy');

chai.use(passport);


global.expect = chai.expect;
