const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const imageId = uuidv4();

const fileStorage = multer.diskStorage({
  destination: (_req, file, callBack) => {
    if (file.fieldname === 'profile_picture_url') {
      callBack(null, path.join('public', 'uploads', 'profiles'));
    } else {
      callBack(null, path.join('public', 'uploads', 'blogs'));
    }
  },
  filename: (_req, file, callBack) => {
    callBack(null, imageId + '-' + file.originalname);
  },
});

const fileFilter = (_req, file, callBack) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callBack(null, true);
  } else {
    callBack(null, false);
  }
};

module.exports = {
  fileStorage,
  fileFilter,
  imageId,
};
