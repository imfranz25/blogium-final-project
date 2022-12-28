const moment = require('moment-timezone');

const monthDayYear = () => {
  /* prettier-ignore */
  return moment()
    .clone()
    .tz('Asia/Manila')
    .format('MMDDYYYY');
};

module.exports = { monthDayYear };
