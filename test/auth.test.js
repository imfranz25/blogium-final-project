/* Testing Libraries, imported server */
const server = require('../server');
const request = require('supertest')(server);
const expect = require('chai').expect;

/* Sample User Input */
const { signUpInput, updateProfileInput, secondUser } = require('./data');
let firstUserToken; // to be populate when success login

/* create other user then login -> will be used in other test */
before(async () => {
  await request.post('/signup').send(secondUser);
});

/**
 * ------------------------------------------------------------------------------
 * POST SIGNUP (USER CREATION)
 * ------------------------------------------------------------------------------
 */
describe('POST /signup', () => {
  it('should return a status of 422 -> empty field "first name"', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      first_name: '', // empty first name
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('First name is required');
  });

  it('should return a status of 422 -> invalid field "first name with number" ', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      first_name: 'francis25', // first name with number
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Invalid first name');
  });

  it('should return a status of 422 -> empty field "last name" ', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      last_name: '', // empty last name
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Last name is required');
  });

  it('should return a status of 422 -> invalid field "last name with number" ', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      last_name: 'ong25', // last name with number
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Invalid last name');
  });

  it('should return a status of 422 -> invalid field "email" ', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      email: 'invalid-email-xd', // invalid email format
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Invalid email format');
  });

  it('should return a status of 422 -> invalid username (3 characters) ', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      username: '333', // 3 chracters only
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Username must be 4 characters and above');
  });

  it('should return a status of 422 -> invalid username (with special characters) ', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      username: 'userName@@@@', // invalid username
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Special characters are not allowed');
  });

  it('should return a status of 422 -> password (no uppercase) ', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      email: 'dummyemail@gmail.com',
      username: 'dummyusername',
      password: 'stratpoint123!', // no uppercase
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password (no lowercase) ', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      email: 'dummyemail@gmail.com',
      username: 'dummyusername',
      password: 'STRATPOINT123!', // no lowercase
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password (no number) ', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      email: 'dummyemail@gmail.com',
      username: 'dummyusername',
      password: 'Stratpoint!', // no number
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password (no special character) ', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      email: 'dummyemail@gmail.com',
      username: 'dummyusername',
      password: 'Stratpoint123', // no special character
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password (7 characters only) ', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      email: 'dummyemail@gmail.com',
      username: 'dummyusername',
      password: 'Stra12!', // 7 chars only
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password and confirm pass does not match', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      email: 'dummyemail@gmail.com',
      username: 'dummyusername',
      confirm_password: 'Notmatched!', // not matched with password
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal(
      'Password and confirm password does not match'
    );
  });

  it('should return a status of 201 -> with json data property user', async () => {
    const response = await request.post('/signup').send(signUpInput);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(201);
    expect(responseTextObject).to.have.an.property('user');
  });

  it('should return a status of 422 -> email already taken ', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      email: signUpInput.email, // email already taken
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Email is already taken');
  });

  it('should return a status of 422 -> username already taken', async () => {
    const response = await request.post('/signup').send({
      ...signUpInput,
      email: 'dummyemail@gmail.com',
      username: signUpInput.username, // username already taken
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
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
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Please input a valid email');
  });

  it('should return a status of 422 -> empty password field', async () => {
    const response = await request.post('/login').send({
      email: signUpInput.email,
      password: '', // empty password
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Password is required');
  });

  it('should return a status of 401 -> email not registered', async () => {
    const response = await request.post('/login').send({
      email: 'dummy123notexisitng@gmail.com', // valid email but not registered
      password: signUpInput.password,
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(401);
    expect(responseTextObject.message).to.equal('Invalid username or password');
  });

  it('should return a status of 401 -> wrong password', async () => {
    const response = await request.post('/login').send({
      email: signUpInput.email, // registered email
      password: 'invalidPass :(', // wrong password
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(401);
    expect(responseTextObject.message).to.equal('Invalid username or password');
  });

  it('should return a status of 200 -> valid email & password', async () => {
    const response = await request.post('/login').send({
      email: signUpInput.email, // valid email
      password: signUpInput.password, // valid pass
    });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(200);
    expect(responseTextObject.token).to.have.an.string('Bearer ');

    firstUserToken = responseTextObject.token; // to be use in updating profile
  });
});

/**
 * ------------------------------------------------------------------------------
 * PATCH PROFILE -> UPDATE USER DETAILS (USERNAME, EMAIL, FIRST & LAST NAME)
 * ------------------------------------------------------------------------------
 */
describe('PATCH /profile', () => {
  it('should return a status of 401 -> not logged in"', async () => {
    const response = await request.patch('/profile').send(updateProfileInput);
    expect(response.status).to.equal(401);
  });

  it('should return a status of 422 -> empty field "first name"', async () => {
    const response = await request
      .patch('/profile')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, first_name: '' }); // empty first name

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('First name is required');
  });

  it('should return a status of 422 -> invalid field "first name with number" ', async () => {
    const response = await request
      .patch('/profile')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, first_name: 'doe25' }); // first name with number

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Invalid first name');
  });

  it('should return a status of 422 -> empty field "last name" ', async () => {
    const response = await request
      .patch('/profile')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, last_name: '' }); // empty last name

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Last name is required');
  });

  it('should return a status of 422 -> invalid field "last name with number" ', async () => {
    const response = await request
      .patch('/profile')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, last_name: 'doe25' }); // last name with number

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Invalid last name');
  });

  it('should return a status of 422 -> invalid field "email" ', async () => {
    const response = await request
      .patch('/profile')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, email: 'invalid-email-xd' }); // invalid email

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Invalid email format');
  });

  it('should return a status of 422 -> invalid username (3 characters) ', async () => {
    const response = await request
      .patch('/profile')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, username: '333' }); // 3 chars only

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Username must be 4 characters and above');
  });

  it('should return a status of 422 -> invalid username (with special characters) ', async () => {
    const response = await request
      .patch('/profile')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, username: 'userName@@@' }); // with special chars

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Special characters are not allowed');
  });

  it('should return a status of 200 -> accept same email input ', async () => {
    const response = await request
      .patch('/profile')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, email: signUpInput.email }); // accept same email

    expect(response.status).to.equal(200);
  });

  it('should return a status of 200 -> accept same username input', async () => {
    const response = await request
      .patch('/profile')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, username: signUpInput.username }); // accept same username

    expect(response.status).to.equal(200);
  });

  it('should return a status of 422 -> email already taken', async () => {
    const response = await request
      .patch('/profile')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, email: secondUser.email }); // email already taken (second)

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Email is already taken');
  });

  it('should return a status of 422 -> username already taken', async () => {
    const response = await request
      .patch('/profile')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, username: secondUser.username }); // username already taken (second)

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Username is already taken');
  });

  it('should return a status of 200 -> with updated token', async () => {
    const response = await request
      .patch('/profile')
      .set('Authorization', firstUserToken)
      .send(updateProfileInput);

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(200);
    expect(responseTextObject.token).to.have.a.string('Bearer ');
  });
});

/**
 * ------------------------------------------------------------------------------
 * PATCH PASSWORD -> UPDATE USER PASSWORD
 * ------------------------------------------------------------------------------
 */
describe('PATCH /password', () => {
  it('should return a status of 401 -> not logged in"', async () => {
    const response = await request.patch('/password').send(updateProfileInput);
    expect(response.status).to.equal(401);
  });

  it('should return a status of 422 -> password (no uppercase) ', async () => {
    const response = await request
      .patch('/password')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, password: 'stratpoint123!' }); // no uppercase

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password (no lowercase) ', async () => {
    const response = await request
      .patch('/password')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, password: 'STRATPOINT123!' }); // no lowercase

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password (no number) ', async () => {
    const response = await request
      .patch('/password')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, password: 'Stratpoint!' }); // no number

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password (no special character) ', async () => {
    const response = await request
      .patch('/password')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, password: 'Stratpoint123' }); // no special character

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password (7 characters only) ', async () => {
    const response = await request
      .patch('/password')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, password: 'Stra12!' }); // 7 chars only

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Weak Password');
  });

  it('should return a status of 422 -> password and confirm pass does not match', async () => {
    const response = await request
      .patch('/password')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, confirm_password: 'Notmatched!' }); // not matched

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal(
      'Password and confirm password does not match'
    );
  });

  it('should return a status of 422 -> invalid old password', async () => {
    const response = await request
      .patch('/password')
      .set('Authorization', firstUserToken)
      .send({ ...updateProfileInput, old_password: 'invalid' }); // use invalid old password

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Incorrect Password');
  });

  it('should return a status of 200 -> password changed successfully', async () => {
    const response = await request
      .patch('/password')
      .set('Authorization', firstUserToken)
      .send(updateProfileInput); // valid inputs

    expect(response.status).to.equal(200);
    expect(JSON.parse(response.text).message).to.equal('Password changed successfully');
  });

  it("should return a status of 403 -> password reset react it's limit", async () => {
    let response;

    /* Change Password 3 times -> for the 3rd time expect that it will not change the password */
    for (let index = 1; index <= 3; index++) {
      response = await request
        .patch('/password')
        .set('Authorization', firstUserToken)
        .send({
          ...updateProfileInput,
          old_password: updateProfileInput.password,
        }); // use the updated password -> old password
    }

    expect(response.status).to.equal(403);
    expect(JSON.parse(response.text).message).to.equal(
      'Unable to reset password, you have reached the limit'
    );
  });
});
