const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

let imageId;

const fileStorage = multer.diskStorage({
  destination: (_req, file, callBack) => {
    if (file.fieldname === 'profile_picture_url') {
      callBack(null, path.join('public', 'uploads', 'profiles'));
    } else {
      callBack(null, path.join('public', 'uploads', 'blogs'));
    }
  },
  filename: (req, file, callBack) => {
    const imageId = uuidv4();
    req.imageId = imageId;
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

const fileLimits = { fileSize: 1024 * 1000 * 10 };

const fileFields = [
  {
    name: 'profile_picture_url',
    maxCount: 1,
  },
  {
    name: 'cover_picture_url',
    maxCount: 1,
  },
];

module.exports = {
  fileStorage,
  fileFilter,
  fileFields,
  fileLimits,
};