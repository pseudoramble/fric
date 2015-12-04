const isResetDay = (date) => {
  const today = date && date.getDay ? date.getDay() : new Date().getDay();

  return today === 1;
};

const doTheReset = () => {
  const thingsToReset = JSON.parse(localStorage.getItem('budget-items') || '[]');
  thingsToReset.forEach(function(thing) {
    const details = JSON.parse(localStorage.getItem(thing));
    details.transactions = [];
    localStorage.setItem(thing, JSON.stringify(details));
  });
};

export default () => {
  if (isResetDay()) {
    doTheReset();
  }
}
