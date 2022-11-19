/* Testing Libraries, imported server */
const server = require('../server');
const request = require('supertest')(server);
const expect = require('chai').expect;

/* Sample User Input */
const { userInput } = require('./data');

/**
 * ------------------------------------------------------------------------------
 * POST SIGNUP (USER CREATION)
 * ------------------------------------------------------------------------------
 */
describe('POST /signup', () => {
  it('should return a status of 422 -> empty field "first name"', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      first_name: '', // empty first name
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('First name is required');
  });

  it('should return a status of 422 -> invalid field "first name with number" ', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      first_name: 'francis25', // first name with number
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Invalid first name');
  });

  it('should return a status of 422 -> empty field "last name" ', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      last_name: '', // empty last name
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Last name is required');
  });

  it('should return a status of 422 -> invalid field "last name with number" ', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      last_name: 'ong25', // last name with number
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Invalid last name');
  });

  it('should return a status of 422 -> invalid field "email" ', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      email: 'invalid-email-xd', // invalid email format
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Invalid email format');
  });

  it('should return a status of 422 -> invalid username (3 characters) ', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      username: '333', // 3 chracters only
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Username must be 4 characters and above');
  });

  it('should return a status of 422 -> invalid username (with special characters) ', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      username: 'userName@@@@', // invalid username
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Special characters are not allowed');
  });

  it('should return a status of 422 -> password (no uppercase) ', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      email: 'dummyemail@gmail.com',
      username: 'dummyusername',
      password: 'stratpoint123!', // no uppercase
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password (no lowercase) ', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      email: 'dummyemail@gmail.com',
      username: 'dummyusername',
      password: 'STRATPOINT123!', // no lowercase
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password (no number) ', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      email: 'dummyemail@gmail.com',
      username: 'dummyusername',
      password: 'Stratpoint!', // no number
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password (no special character) ', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      email: 'dummyemail@gmail.com',
      username: 'dummyusername',
      password: 'Stratpoint123', // no special character
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password (7 characters only) ', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      email: 'dummyemail@gmail.com',
      username: 'dummyusername',
      password: 'Stra12!', // 7 chars only
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password and confirm pass does not match', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      email: 'dummyemail@gmail.com',
      username: 'dummyusername',
      confirm_password: 'Notmatched!', // not matched with password
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal(
      'Password and confirm password does not match'
    );
  });

  it('should return a status of 201 with json data property users', async () => {
    const response = await request.post('/signup').send(userInput);

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(201);
    expect(responseTextObject).to.have.an.property('user');
  });

  it('should return a status of 422 -> email already taken ', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      email: userInput.email, // email already taken
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Email is already taken');
  });

  it('should return a status of 422 -> username already taken', async () => {
    const response = await request.post('/signup').send({
      ...userInput,
      email: 'dummyemail@gmail.com',
      username: userInput.username, // username already taken
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Username is already taken');
  });
});

/**
 * ------------------------------------------------------------------------------
 * POST LOGIN
 * ------------------------------------------------------------------------------
 */
describe('POST /login', () => {
  it('should return a status of 422 -> invalid email format (including empty email fields)', async () => {
    const response = await request.post('/login').send({
      email: 'InvalidEmail', // invalid email
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Please input a valid email');
  });

  it('should return a status of 422 -> empty password field', async () => {
    const response = await request.post('/login').send({
      email: userInput.email,
      password: '', // empty password
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Password is required');
  });

  it('should return a status of 401 -> email not registered', async () => {
    const response = await request.post('/login').send({
      email: 'dummy123notexisitng@gmail.com', // valid email but not registered
      password: userInput.password,
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(401);
    expect(responseTextObject).to.have.an.property('message');
    expect(responseTextObject.message).to.equal('Invalid username or password');
  });

  it('should return a status of 401 -> wrong password', async () => {
    const response = await request.post('/login').send({
      email: userInput.email, // registered email
      password: 'invalidPass :(', // wrong password
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(401);
    expect(responseTextObject).to.have.an.property('message');
    expect(responseTextObject.message).to.equal('Invalid username or password');
  });

  it('should return a status of 200 -> valid email & password', async () => {
    const response = await request.post('/login').send({
      email: userInput.email, // valid email
      password: userInput.password, // valid pass
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(200);
    expect(responseTextObject).to.have.an.property('token');
    expect(responseTextObject.token).to.have.an.string('Bearer ');
  });
});
