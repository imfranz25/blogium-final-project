const server = require('../server');
const request = require('supertest')(server);
const expect = require('chai').expect;

before((done) => {
  console.log('Waiting for database to connect...');
  setTimeout(() => {
    done();
  }, 15000);
});

describe('Auth API', () => {
  describe('POST /signup', () => {
    it('should a status of 201 with json data property users', async () => {
      const response = await request.post('/signup').send({
        first_name: 'Francis',
        last_name: 'Ong',
        email: 'francis.ong25@gmail.com',
        username: 'francis25',
        password: 'Stratpoint123!',
        confirm_password: 'Stratpoint123!',
        profile_picture_url: 'sample.png',
      });

      expect(response.status).to.equal(201);
      expect(JSON.parse(response.text)).to.have.an.property('user');
    });
  });
});
