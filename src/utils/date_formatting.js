const getCurrentDate = (date) => {
  const currentDate = new Date(date);
  return currentDate.getDate();
};

const getCurrentMonth = (date) => {
  const currentMonth = new Date(date);
  return currentMonth.getMonth() + 1;
};

const getCurrentYear = (date) => {
  const currentYear = new Date(date);
  return currentYear.getFullYear();
};

module.exports = {
  getCurrentDate,
  getCurrentMonth,
  getCurrentYear,
};
