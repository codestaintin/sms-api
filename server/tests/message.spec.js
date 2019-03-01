import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../../server';

chai.use(chaiHttp);

describe('Tests suites for message controller', () => {
  describe('Test for /POST messages', () => {
    it('should throw an error if the content field is missing', (done) => {
      request(server)
        .post('/api/v1/message/create')
        .send({
          senderId: '08080310980',
          recipientId: '09896754453'
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('A validation error occurred');
          expect(res.body.error.content[0]).to.equal('The content field is required.');
          done();
        });
    });
    it('should throw an error if the senderId field is missing', (done) => {
      request(server)
        .post('/api/v1/message/create')
        .send({
          recipientId: '09896754453',
          content: 'How are you doing?'
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('A validation error occurred');
          expect(res.body.error.senderId[0]).to.equal('The senderId field is required.');
          done();
        });
    });
    it('should throw an error if the recipientId field is missing', (done) => {
      request(server)
        .post('/api/v1/message/create')
        .send({
          senderId: '08080310980',
          content: 'How are you doing?'
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('A validation error occurred');
          expect(res.body.error.recipientId[0]).to.equal('The recipientId field is required.');
          done();
        });
    });
    it('should throw an error if the recipientId field is missing', (done) => {
      request(server)
        .post('/api/v1/message/create')
        .send({
          recipientId: '09896754453',
          senderId: '08080310980',
          content: 'How are you doing?'
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.statusCode).to.equal(201);
          expect(res.body.message).to.equal('Message sent successfully');
          expect(res.body.newMessage.status).to.equal('sent');
          expect(res.body.newMessage.content).to.equal('How are you doing?');
          expect(res.body.newMessage.senderId).to.equal('08080310980');
          expect(res.body.newMessage.recipientId).to.equal('09896754453');
          done();
        });
    });
  });
  describe('Test for /GET messages', () => {
    it('should return a message with status sent', (done) => {
      request(server)
        .get('/api/v1/message/1')
        .end((err, res) => {
          if(err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Message successfully retrieved');
          expect(res.body.updatedMessage.status).to.equal('read');
          done();
        })
    })
  });
});