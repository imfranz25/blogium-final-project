# Final Project: Blog Site

You will be creating a blog site, the user should be able to view added blogs, as well as create, edit and hide/remove existing blogs. Some pages in the website requires user to be authenticated before access. Also the blog must have a cover photo and profile picture as well as the details as blog story.

# Technology used

- Nodejs -> Express
- any frontend library of your choice (ex. bootstrap) -> React
- Mongodb (moongose)
- jwt
- heroku
- multer (file upload)

# Notes

- [X] password should be md5 hashed before storing to database
- [ ] protected routes and proper redirection must be implemented
- [X] implementation for timestamps is a must (created_at,updated_at,deleted_at)
- [ ] deleted records should be soft deleted, meaning instead of removing the column, it should have deleted_at value and must be excluded to future queries
- [ ] Implementation for pagination is not required but good to have.
- [X] id implementation is done via uuid npm package.
- [X] you can use either mongodb or mysql
- [ ] retrieving of blogs must exclude deleted or is_draft true records
- [ ] must be deployed to heroku for actual testing
- [X] must be deployed to atlas(mongodb) or freemysqlhosting(mysql)

# Requirements

Checklist | Pages | Feature | Route
------------ | ------------- | ------------- | -------------
- [ ] | Homepage | Able to view Blog list created by admin | www.example.com
- [ ] | ------------ | Able to select blog by clicking the blog item. | ------------

