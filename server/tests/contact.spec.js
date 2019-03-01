import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../../server';

chai.use(chaiHttp);

describe('Tests for contact controller', () => {
  describe('Test for get contacts', () => {
    it('should return all contacts', (done) => {
      request(server)
        .get('/api/v1/contact/all')
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Contact List');
          expect(res.body.allContacts.length).to.equal(2);
          done();
        });
    });
    it('should return all contacts', (done) => {
      request(server)
        .get('/api/v1/contact/a')
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('That route does not exist');
          done();
        });
    });
  });
  describe('Test for all /POST actions', () => {
    it('should create a new contact', (done) => {
      request(server)
        .post('/api/v1/contact/create')
        .set('Accept', 'application/json')
        .send({
          name: 'Joshua',
          phoneNumber: '07865674366'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(201);
          expect(res.body.message).to.equal('Contact successfully added');
          expect(res.body.contact.name).to.equal('Joshua');
          expect(res.body.contact.phoneNumber).to.equal('07865674366');
          done();
        })
    });
    it('should throw an error if the name field is missing', (done) => {
      request(server)
        .post('/api/v1/contact/create')
        .set('Accept', 'application/json')
        .send({
          phoneNumber: '07865674366'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('A validation error occurred');
          expect(res.body.errors.name[0]).to.equal('The name field is required.');
          done();
        })
    });
    it('should throw an error if the phone number field is missing', (done) => {
      request(server)
        .post('/api/v1/contact/create')
        .set('Accept', 'application/json')
        .send({
          name: 'Jon snow'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('A validation error occurred');
          expect(res.body.errors.phoneNumber[0]).to.equal('The phoneNumber field is required.');
          done();
        })
    });
    it('should throw a status of 409 if a user with that phone number already exists', (done) => {
      request(server)
        .post('/api/v1/contact/create')
        .set('Accept', 'application/json')
        .send({
          name: 'Emmanuel',
          phoneNumber: '07865674366'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(409);
          expect(res.body.message).to.equal('Contact already exist');
          done();
        })
    });
  });
  describe('Test for all /DELETE actions', () => {
    it('should delete a contact record with a valid ID', (done) => {
      request(server)
        .delete('/api/v1/contact/07865674366')
        .end((err, res) => {
          if(err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Contact successfully deleted');
          done();
        });
    });
    it('should throw an error when ID does not exists', (done) => {
      request(server)
        .delete('/api/v1/contact/07865674366')
        .end((err, res) => {
          if(err) return done(err);
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Contact not found');
          done();
        });
    });
  });
});