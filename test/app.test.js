const app = require('../app');
const { expect } = require('chai');
const supertest = require('supertest');
// const assert = require('assert');

describe('express app', () => {
  describe('GET /apps', () => {
    //checking if no sort is input as query that the whole list is returned
    it('should return an array of apps as json', () => {
      return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.be.an('object')
          expect(res.body[0]).to.include.all.keys('App', 'Rating', 'Genres')
        })
    })
    // someone puts in the wrong search query
    it('should be 400 if sort is incorrect', () => {
      return supertest(app)
        .get('/apps')
        .query({ sort: 'MISTAKE' })
        .expect(400)
    });

    // someone puts in the correct search query 
    it('should be 200 if sort is correct', () => {
      return supertest(app)
        .get('/apps')
        .query({ sort: ('App', 'Rating') })
        .expect(200)
    });


    // if search query is incorrect it will return empty array
    it('empty array', () => {
      return supertest(app)
        .get('/apps')
        // .query({ Genre: 'MISTAKE' })
        .then(res => {
          // make sure you get an array
          expect(res.body).to.be.an('array');
          // array must not be empty
          expect(res.body).to.have.lengthOf.at.least(1);
        })
    })

    it('should return filtered games by title', () => {
      return supertest(app)
        .get('/apps')
        .query({ Genre: 'Arcade' })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(3)
        })
    })

  })






})
