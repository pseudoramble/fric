const isAcceptableDate = (date) => date && date.getYear && date.getMonth;

/**
 * Reset day is the day where all the previous month's data is forgotten and you start fresh.
 * This aims to define reset day as any new month. A few examples:
 *  a) Logged in on January at any point, then logged in on February -> Reset
 *  b) Logged in January 2016, and for some reason don't login until Jaunary 2017 -> Reset
 *  c) Logged in during June, but don't make it back on until August -> Reset
 *  d) Multiple logins during a month -> No Reset!
 */
const isResetDay = (date, lastLogin) => {
  return isAcceptableDate(date) && isAcceptableDate(lastLogin) &&
    (
      date.getYear() - lastLogin.getYear() !== 0 ||
        date.getMonth() - lastLogin.getMonth() !== 0
    );
};

const doTheReset = () => {
  const thingsToReset = JSON.parse(localStorage.getItem('budget-items') || '[]');

  thingsToReset.forEach(function(thing) {
    const details = JSON.parse(localStorage.getItem(thing));
    details.transactions = [];
    localStorage.setItem(thing, JSON.stringify(details));
  });
};

const getLastLogin = () => {
  return new Date(localStorage.getItem('last-login'));
};

const saveLastLogin = (date) => {
  localStorage.setItem('last-login', date.toUTCString());
};

export default () => {
  const today = new Date(),
        lastLogin = getLastLogin();

  if (isResetDay(today, lastLogin)) {
    doTheReset();
  }

  saveLastLogin(today);
}
