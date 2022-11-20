/* Testing Libraries, imported server */
const server = require('../server');
const request = require('supertest')(server);
const expect = require('chai').expect;

/* User Input */
const { signUpInput, userBlogInput } = require('./data');
let token;
let blogId;

/**
 * Login first using the newly created user from auth test
 * */
before(async () => {
  const response = await request.post('/login').send({
    email: signUpInput.email, // valid email
    password: signUpInput.password, // valid pass
  });

  const responseTextObject = JSON.parse(response.text);
  token = responseTextObject.token;
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
      .set('Authorization', token)
      .send({ title: '' }); // no title

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Blog title is required');
  });

  it('should return a status of 422 -> empty blog description', async () => {
    const response = await request
      .post('/blog/add')
      .set('Authorization', token)
      .send({ ...userBlogInput, description: '' }); // no description

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Description is required');
  });

  it('should return a status of 201 -> with json object blog', async () => {
    const response = await request
      .post('/blog/add')
      .set('Authorization', token)
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
    const response = await request.get(`/randomBlogId`).set('Authorization', token);
    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(404);
    expect(responseTextObject.message).to.equal('Blog not found');
  });

  it('should return a status of 200 -> with json blog', async () => {
    const response = await request.get(`/${blogId}`).set('Authorization', token);
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
    const response = await request.get(`/blog`).set('Authorization', token);
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
      .set('Authorization', token)
      .send(userBlogInput);

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(404);
    expect(responseTextObject.message).to.equal('Blog not found');
  });

  it('should return a status of 422 -> empty blog title', async () => {
    const response = await request
      .patch(`/blog/${blogId}`)
      .set('Authorization', token)
      .send({ title: '' });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.an.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Blog title is required');
  });

  it('should return a status of 422 -> empty blog description', async () => {
    const response = await request
      .patch(`/blog/${blogId}`)
      .set('Authorization', token)
      .send({ ...userBlogInput, description: '' });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(422);
    expect(responseTextObject).to.have.a.property('errors');
    expect(responseTextObject.errors[0].msg).to.equal('Description is required');
  });

  it('should return a status of 200 -> update title', async () => {
    const response = await request
      .patch(`/blog/${blogId}`)
      .set('Authorization', token)
      .send({ ...userBlogInput, title: 'Updated Blog Title' });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(200);
    expect(responseTextObject.blog?.title).to.equal('Updated Blog Title');
  });

  it('should return a status of 200 -> update title', async () => {
    const response = await request
      .patch(`/blog/${blogId}`)
      .set('Authorization', token)
      .send({ ...userBlogInput, description: 'I updated the blog description' });

    const responseTextObject = JSON.parse(response.text);

    expect(response.status).to.equal(200);
    expect(responseTextObject.blog?.description).to.equal('I updated the blog description');
  });
});
