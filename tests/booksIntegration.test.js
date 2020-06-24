require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

const app = require('../app');
const supertest = require('supertest');

const Book = mongoose.model('Book');

const agent = request.agent(app);

describe('Book crud test', () => {
  it('should allow the book to be posted and return _id', (done) => {
    const bookPost = { title: 'My Title', author: 'niraj r', genre: 'Fiction' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, res) => {
        // res.body.read.should.not.equal(false);
        res.body.should.have.property('_id');
        done();
      });

  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});

