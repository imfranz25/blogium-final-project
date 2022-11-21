/* Testing Libraries, imported server */
const server = require('../server');
const request = require('supertest')(server);
const expect = require('chai').expect;

/* User Input */
const { signUpInput, userBlogInput, secondUser } = require('./data');
let firstUserToken;
let secondUserToken;
let blogId;

/**
 * Create another user
 * Login first using the newly created user from auth test
 * */
before(async () => {
  /* create another user */
  await request.post('/signup').send(secondUser);

  /* Login -> first User */
  const firstLogin = await request.post('/login').send({
    email: signUpInput.email, // valid email
    password: signUpInput.password, // valid pass
  });

  firstUserToken = JSON.parse(firstLogin.text).token;

  /* login -> 2nd user */
  const secondLogin = await request.post('/login').send({
    email: secondUser.email, // valid email
    password: secondUser.password, // valid pass
  });

  secondUserToken = JSON.parse(secondLogin.text).token;
});

/**
 * POST BLOG -> CREATE BLOG
 */
describe('POST /blog/add', () => {
  it('should return a status of 401 -> authorization required', async () => {
    // no header -> Authorization: Bearer ...
    const response = await request.post('/blog/add').send(userBlogInput);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(401);
    expect(responseTextObject.message).to.equal('Log in first');
  });

  it('should return a status of 403 -> invalid token', async () => {
    const response = await request
      .post('/blog/add')
      .set('Authorization', 'randomInvalidToken') // random token
      .send(userBlogInput);

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(403);
    expect(responseTextObject.message).to.equal('Invalid token');
  });

  it('should return a status of 422 -> empty blog title', async () => {
    const response = await request
      .post('/blog/add')
      .set('Authorization', firstUserToken)
      .send({ title: '' }); // no title

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Blog title is required');
  });

  it('should return a status of 422 -> empty blog description', async () => {
    const response = await request
      .post('/blog/add')
      .set('Authorization', firstUserToken)
      .send({ ...userBlogInput, description: '' }); // no description

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Description is required');
  });

  it('should return a status of 201 -> with json object blog', async () => {
    const response = await request
      .post('/blog/add')
      .set('Authorization', firstUserToken)
      .send(userBlogInput);

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(201);
    expect(responseTextObject.blog).to.have.an.property('_id');

    blogId = responseTextObject.blog.id;
  });
});

/**
 * GET SINGLE BLOG
 */
describe('GET /:blog', () => {
  it('should return a status of 401 -> not authenticated', async () => {
    const response = await request.get(`/${blogId}`);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(401);
    expect(responseTextObject.message).to.equal('Log in first');
  });

  it('should return a status of 404 -> blog not found', async () => {
    const response = await request.get(`/randomBlogId`).set('Authorization', firstUserToken);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(404);
    expect(responseTextObject.message).to.equal('Blog not found');
  });

  it('should return a status of 200 -> with json blog', async () => {
    const response = await request.get(`/${blogId}`).set('Authorization', firstUserToken);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(200);
    expect(responseTextObject.message).to.equal('Blog fetched');
    expect(responseTextObject.blog?.title).to.equal('Test Blog');
  });
});

/**
 * GET ALL BLOG
 */
describe('GET /blog', () => {
  it('should return a status of 401 -> not authenticated', async () => {
    const response = await request.get(`/blog`);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(401);
    expect(responseTextObject.message).to.equal('Log in first');
  });

  it('should return a status of 200 -> with json blogs', async () => {
    const response = await request.get(`/blog`).set('Authorization', firstUserToken);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(200);
    expect(responseTextObject.blogs).to.have.an.lengthOf(1); // we have only 1 blog created
  });
});

/**
 * UPDATE BLOG
 */
describe('PATCH /blog/:blogId', () => {
  it('should return a status of 401 -> not authenticated', async () => {
    const response = await request.patch(`/blog/${blogId}`);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(401);
    expect(responseTextObject.message).to.equal('Log in first');
  });

  it('should return a status of 404 -> blog not found', async () => {
    const response = await request
      .patch(`/blog/someRandomBlogId`)
      .set('Authorization', firstUserToken)
      .send(userBlogInput);

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(404);
    expect(responseTextObject.message).to.equal('Blog not found');
  });

  it('should return a status of 422 -> empty blog title', async () => {
    const response = await request
      .patch(`/blog/${blogId}`)
      .set('Authorization', firstUserToken)
      .send({ title: '' });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Blog title is required');
  });

  it('should return a status of 422 -> empty blog description', async () => {
    const response = await request
      .patch(`/blog/${blogId}`)
      .set('Authorization', firstUserToken)
      .send({ ...userBlogInput, description: '' });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Description is required');
  });

  it('should return a status of 403 -> unathorized, not his/her own blog post', async () => {
    const response = await request
      .patch(`/blog/${blogId}`)
      .set('Authorization', secondUser) // second user
      .send(userBlogInput);

    expect(response.status).to.equal(403);
  });

  it('should return a status of 200 -> update title', async () => {
    const response = await request
      .patch(`/blog/${blogId}`)
      .set('Authorization', firstUserToken)
      .send({ ...userBlogInput, title: 'Updated Blog Title' });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(200);
    expect(responseTextObject.blog?.title).to.equal('Updated Blog Title');
  });

  it('should return a status of 200 -> update description', async () => {
    const response = await request
      .patch(`/blog/${blogId}`)
      .set('Authorization', firstUserToken)
      .send({ ...userBlogInput, description: 'I updated the blog description' });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(200);
    expect(responseTextObject.blog?.description).to.equal('I updated the blog description');
  });
});

/**
 * DELETE A BLOG
 */
describe('DELETE /:blogId', () => {
  it('should return a status of 401 -> not authenticated', async () => {
    const response = await request.delete(`/${blogId}`);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(401);
    expect(responseTextObject.message).to.equal('Log in first');
  });

  it('should return a status of 404 -> blog to be delete -> does not exist', async () => {
    const response = await request.delete(`/someRandomBlogId`).set('Authorization', firstUserToken);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(404);
    expect(responseTextObject.message).to.equal('Blog not found');
  });

  it('should return a status of 200 -> to confirm if blog exist before deleting', async () => {
    const response = await request.get(`/${blogId}`).set('Authorization', firstUserToken);
    expect(response.status).to.equal(200);
  });

  it('should return a status of 403 -> unathorized, not his/her own blog post', async () => {
    const response = await request.delete(`/${blogId}`).set('Authorization', secondUserToken);
    expect(response.status).to.equal(403);
  });

  it('should return a status of 200 -> with json deleted blog', async () => {
    const response = await request.delete(`/${blogId}`).set('Authorization', firstUserToken);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(200);
    expect(responseTextObject.blog?.deleted_at).to.not.equal(null); // null -> updated to date
  });

  it('should return a status of 404 -> from API "GET /:blogId"', async () => {
    const response = await request.get(`/${blogId}`).set('Authorization', firstUserToken);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(404);
    expect(responseTextObject.message).to.equal('Blog not found');
  });
});
