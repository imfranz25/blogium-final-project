/* Testing Libraries, imported server */
const server = require('../server');
const request = require('supertest')(server);
const expect = require('chai').expect;

/* Model(s) */
const { User } = require('../models');

/* Global variables -> to be used on later tests */
let userId;
let userEmail;
let userName;

/* Database connection waiting time -> 5 secs */
before((done) => {
  console.log('Waiting for database to connect...\n');
  setTimeout(() => {
    done();
  }, 5000);
});

describe('Auth API', () => {
  describe('POST /signup', () => {
    it('should return a status of 422 -> empty field "first name"', async () => {
      const response = await request.post('/signup').send({
        first_name: '', // empty first name
      });

      const responseTextObject = JSON.parse(response.text);

      expect(response.status).to.equal(422);
      expect(responseTextObject).to.have.an.property('errors');
      expect(responseTextObject.errors[0].msg).to.equal('First name is required');
    });

    it('should return a status of 422 -> invalid field "first name with number" ', async () => {
      const response = await request.post('/signup').send({
        first_name: 'francis25', // empty first name
      });

      const responseTextObject = JSON.parse(response.text);

      expect(response.status).to.equal(422);
      expect(responseTextObject).to.have.an.property('errors');
      expect(responseTextObject.errors[0].msg).to.equal('Invalid first name');
    });

    it('should return a status of 201 with json data property users', async () => {
      const response = await request.post('/signup').send({
        first_name: 'Francis',
        last_name: 'Ong',
        email: 'francis.ong25@gmail.com',
        username: 'francis25',
        password: 'Stratpoint123!',
        confirm_password: 'Stratpoint123!',
        profile_picture_url: 'sample.png',
      });

      const responseTextObject = JSON.parse(response.text);

      expect(response.status).to.equal(201);
      expect(responseTextObject).to.have.an.property('user');

      /* Store the newly created userId -> delete later */
      userId = responseTextObject.user.id;
    });
  });
});

/* Data Clean Up -> delete created user */
after(async () => {
  try {
    await User.findOneAndDelete({ id: userId });
  } catch (error) {
    console.log(error);
  }
});
