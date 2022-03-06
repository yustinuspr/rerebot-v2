const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const quarter = require('dayjs/plugin/quarterOfYear');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(utc);
dayjs.extend(quarter);
dayjs.extend(relativeTime);

const getCurrentQuarter = () => dayjs().utcOffset(7).quarter();

const getDaysToEndQuarter = () => dayjs().utcOffset(7).endOf('quarter').toNow(true);

module.exports = {
  getCurrentQuarter,
  getDaysToEndQuarter,
};