const app = require('../app');
const { expect } = require('chai');
const supertest = require('supertest');
// const assert = require('assert');

describe('Express App', () => {
  it('should return a message from get /', () => {
    return supertest(app)
      .get('./')
      .expect(200, 'Hellow Express!');
  });
});

