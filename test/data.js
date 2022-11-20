/** Valid User Data Inputs */
const signUpInput = {
  first_name: 'Francis',
  last_name: 'Ong',
  email: 'francis25ong@gmail.com',
  username: 'francis25',
  password: 'Stratpoint123!',
  confirm_password: 'Stratpoint123!',
  profile_picture_url: 'sample.png',
};

const userBlogInput = {
  title: 'Test Blog',
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  cover_picture_url: 'sample.png',
};

module.exports = {
  signUpInput,
  userBlogInput,
};